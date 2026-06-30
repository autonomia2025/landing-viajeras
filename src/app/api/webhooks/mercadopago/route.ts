import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verificar firma del webhook de MercadoPago
    // TODO: Validar x-signature header cuando esté configurado
    // const signature = request.headers.get('x-signature')

    const { type, data } = body

    if (type === 'payment') {
      const paymentId = data?.id

      if (!paymentId) {
        return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 })
      }

      // TODO: Obtener detalle del pago desde la API de MP
      // const payment = await getPaymentById(paymentId)
      // Actualizar order según el estado del pago

      console.log('MercadoPago webhook received - payment ID:', paymentId)

      // Placeholder: Actualizar estado del pago en la orden
      // await prisma.order.updateMany({
      //   where: { mercadoPagoPaymentId: paymentId },
      //   data: { paymentStatus: mapMPStatus(payment.status) },
      // })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('MP Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
