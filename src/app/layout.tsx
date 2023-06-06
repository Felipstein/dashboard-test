import './globals.css'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard Tests',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={clsx(inter.className, 'h-ful m-4 bg-zinc-100')}>
        {children}
      </body>
    </html>
  )
}
