import './globals.css'
import Header from './header'

import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin-ext'], weight: '400' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
