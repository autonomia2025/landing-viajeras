'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

interface WishlistStore {
  items: Product[]
  toggle: (product: Product) => void
  has: (productId: string) => boolean
  count: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        set((state) => {
          const exists = state.items.some((p) => p.id === product.id)
          return {
            items: exists
              ? state.items.filter((p) => p.id !== product.id)
              : [...state.items, product],
          }
        })
      },

      has: (productId) => get().items.some((p) => p.id === productId),

      count: () => get().items.length,
    }),
    {
      name: 'viajeras-wishlist',
    }
  )
)
