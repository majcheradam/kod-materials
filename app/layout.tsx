import './globals.css'
import Header from './header'
import type { Metadata } from 'next'

import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin-ext'], weight: '400' })

export const metadata: Metadata = {
  title: {
    default: 'Kod Materials',
    template: '%s | Kod Materials',
  },
  description:
    'Kod Materials to miejsce, które dostarcza najnowszych materiałów dla studentów informatyki z Politechniki Rzeszowskiej.',
  openGraph: {
    title: 'Kod Materiały',
    description:
      'Kod Materials to miejsce, które dostarcza najnowszych materiałów dla studentów informatyki z Politechniki Rzeszowskiej.',
    url: 'https://kod-materialy.vercel.app/',
    siteName: 'Kod Materiały',
    images: [
      {
        url: 'https://kod-materialy.vercel.app/og.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'pl',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
