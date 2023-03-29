import './globals.css'
import Header from './header'
import type { Metadata } from 'next'

import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin-ext'], weight: '400' })

export const metadata = {
  openGraph: {
    title: 'Kod Materiały',
    description:
      'Strona "Kod" to miejsce, które dostarcza najnowszych materiałów dla studentów informatyki z Politechniki Rzeszowskiej. Znajdziesz tutaj artykuły, tutoriale i poradniki na tematy związane z programowaniem, bazami danych, algorytmiką i wieloma innymi zagadnieniami z dziedziny informatyki. Nasza strona oferuje również dostęp do darmowych materiałów edukacyjnych oraz ciekawych wykładów prowadzonych przez naszych ekspertów. Dołącz do nas już dziś i zacznij rozwijać swoje umiejętności w dziedzinie informatyki!',
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
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
