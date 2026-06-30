import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export interface CheckoutItem {
  productId: string
  variantId?: string
  quantity: number
  price: number
  name: string
}

export interface CheckoutBody {
  items: CheckoutItem[]
  customer: {
    name: string
    email: string
    phone?: string
    rut?: string
  }
  shippingAddress: {
    street: string
    city: string
    region: string
    postalCode?: string
  }
  paymentMethod: 'mercadopago' | 'webpay' | 'transferencia'
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json()
    const { items, customer, shippingAddress, paymentMethod } = body

    if (!items?.length || !customer?.email || !paymentMethod) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shippingCost = subtotal >= 25000 ? 0 : 3990
    const total = subtotal + shippingCost

    // Upsert customer
    const dbCustomer = await prisma.customer.upsert({
      where: { email: customer.email },
      update: { name: customer.name, phone: customer.phone ?? null, rut: customer.rut ?? null },
      create: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone ?? null,
        rut: customer.rut ?? null,
      },
    })

    const orderNumber = `MV-${Date.now()}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: dbCustomer.id,
        paymentMethod,
        paymentStatus: 'pendiente',
        subtotal,
        shippingCost,
        total,
        shippingAddress: JSON.stringify(shippingAddress),
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId ?? null,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    })

    // MercadoPago integration — pendiente de configurar credenciales
    if (paymentMethod === 'mercadopago') {
      const mpAccessToken = process.env.MP_ACCESS_TOKEN
      if (!mpAccessToken) {
        return NextResponse.json({
          orderId: order.id,
          orderNumber: order.orderNumber,
          paymentUrl: null,
          message: 'MercadoPago no configurado. El pago se procesará por transferencia.',
          status: 'pending_setup',
        })
      }

      // TODO: Crear preferencia de pago en MercadoPago cuando esté configurado
      // const mpItems = items.map((item) => ({
      //   id: item.productId,
      //   title: item.name,
      //   quantity: item.quantity,
      //   currency_id: 'CLP',
      //   unit_price: item.price,
      // }))
      // const preference = await createMPPreference({ items: mpItems, order_id: order.id })
    }

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.orderNumber,
      total: order.total,
      paymentMethod,
      status: 'created',
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Error al procesar el pedido' }, { status: 500 })
  }
}
