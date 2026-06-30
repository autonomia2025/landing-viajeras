export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  categorySlug: string
  stock: number
  variants?: ProductVariant[]
  tags: string[]
  featured: boolean
  isNew: boolean
  rating: number
  reviewCount: number
  sku: string
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  stock: number
  priceModifier?: number
}

export interface CartItem {
  product: Product
  quantity: number
  variant?: ProductVariant
}

export interface Order {
  id: string
  orderNumber: string
  customer: Customer
  items: OrderItem[]
  status: OrderStatus
  total: number
  subtotal: number
  shippingCost: number
  discount: number
  paymentMethod: string
  paymentStatus: PaymentStatus
  shippingAddress: Address
  trackingNumber?: string
  createdAt: string
  updatedAt: string
  notes?: string
}

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  price: number
  variant?: ProductVariant
}

export type OrderStatus =
  | 'nuevo'
  | 'pagado'
  | 'preparando'
  | 'enviado'
  | 'entregado'
  | 'cancelado'

export type PaymentStatus = 'pendiente' | 'pagado' | 'fallido' | 'reembolsado'

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  rut?: string
  totalOrders: number
  totalSpent: number
  createdAt: string
  addresses: Address[]
}

export interface Address {
  id: string
  street: string
  city: string
  region: string
  zipCode?: string
  isDefault: boolean
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  productId: string
  verified: boolean
  createdAt: string
  avatar?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description?: string
  productCount: number
}

export interface SiteContent {
  hero: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
    image: string
  }
  benefits: Benefit[]
  featuredProductIds: string[]
  testimonials: Review[]
  faqItems: FAQItem[]
}

export interface Benefit {
  icon: string
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}
