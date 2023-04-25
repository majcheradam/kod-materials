import Image from 'next/image'
import Link from 'next/link'
import { getAllCategories } from '@/lib/queries'
import Hamburger from './hamburger'

export const Header = (async () => {
  const categories = await getAllCategories()

  return (
    <header className="max-w-[1440px] mx-auto flex items-center justify-between py-6 px-4 lg:px-20">
      <Link href="/" aria-label="Przejdź do strony głównej">
        <Image src="/logo.svg" alt="" width={170} height={42} priority />
      </Link>
      <nav className="hidden lg:inline">
        <ul className="flex flex-row items-center gap-6 text-lg cursor-pointer">
          {categories.map((categories) => (
            <li
              className="relative after:absolute after:w-1 after:h-1 after:rounded-full after:-right-3.5 after:top-1/2 after:-translate-y-1/2 after:bg-current after:cursor-default"
              key={categories.name}
            >
              <Link
                href={`category/` + categories.slug}
                key={categories.name}
                aria-label={`Przejdź do kategori ` + categories.name}
              >
                {categories.name}
              </Link>
            </li>
          ))}
          <li className="relative after:absolute after:w-1 after:h-1 after:rounded-full after:-right-3.5 after:top-1/2 after:-translate-y-1/2 after:bg-current">
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
              <Image src="/github.svg" alt="" width={30} height={30} priority />
            </Link>
          </li>
        </ul>
      </nav>
      <Hamburger categories={categories} />
    </header>
  )
}) as unknown as () => JSX.Element
