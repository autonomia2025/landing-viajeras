import { Header } from './Header'
import { Footer } from './Footer'
import { CartSidebar } from '@/components/cart/CartSidebar'
import type { ReactNode } from 'react'

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartSidebar />
    </>
  )
}
