import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="max-w[1440] mx-auto flex max-w-7xl items-center justify-between py-6 px-4 lg:px-20">
      <Link href="#">
        <Image src="/logo.svg" alt="" width={170} height={42} />
      </Link>
      <nav className="hidden sm:inline">
        <ul className="flex flex-row items-center gap-2 text-lg">
          <Link href="#">
            <li>Aplikacje Webowe</li>
          </Link>
          <p>·</p>
          <Link href="#">
            <li>Startupy</li>
          </Link>
          <p>·</p>
          <Link href="#">
            <Image src="/discord.svg" alt="" width={30} height={30} />
          </Link>
          <p>·</p>
          <Link href="#">
            <Image src="/github.svg" alt="" width={30} height={30} />
          </Link>
        </ul>
      </nav>
      <button className="sm:hidden">
        <Image src="/hamburger.svg" alt="" width={42} height={42} />
      </button>
    </header>
  )
}

export default Header
