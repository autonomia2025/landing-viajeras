import type { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const metadata = {
  title: { default: 'Panel Admin | Muy Viajeras Chile', template: '%s | Admin' },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFF8FA] flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}
