'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Categories } from '@/lib/queries'

interface HamburgerProps {
  categories: Categories[]
}

function Hamburger({ categories }: HamburgerProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <button
        className="lg:hidden"
        aria-label="Otwórz menu"
        role="button"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen)
          document.body.classList.toggle('lock-scroll')
        }}
      >
        <Image src="/hamburger.svg" alt="" width={42} height={42} priority />
      </button>

      {isMenuOpen && (
        <nav className="lg:hidden absolute top-[90px] left-0 w-full h-full bg-white z-10">
          <ul className="flex flex-col items-center justify-center pt-6 gap-6 text-lg cursor-pointer">
            {categories.map((categories) => (
              <li key={categories.name}>
                <Link
                  href={`category/` + categories.slug}
                  key={categories.name}
                  aria-label={`Przejdź do kategori ` + categories.name}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen)
                    document.body.classList.toggle('lock-scroll')
                  }}
                >
                  {categories.name}
                </Link>
              </li>
            ))}
            <div className="flex gap-6">
              <li>
                <Link
                  href="https://discord.com/channels/381092165729910786/"
                  aria-label="Przejdź do discorda SKNI Kod"
                >
                  <Image
                    src="/discord.svg"
                    alt=""
                    width={30}
                    height={30}
                    priority
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/skni-kod/"
                  aria-label="Przejdź do githuba SKNI Kod"
                >
                  <Image
                    src="/github.svg"
                    alt=""
                    width={30}
                    height={30}
                    priority
                  />
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      )}
    </>
  )
}

export default Hamburger
