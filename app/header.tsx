import Image from 'next/image'
import Link from 'next/link'

async function getAllCategories() {
  const response = await fetch(
    'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clfqi8une019a01uebyhb36aq/master',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{
          categories {
            name
            slug
          }
        }
        `,
      }),
    }
  )
  const { data } = await response.json()
  return data.categories
}

interface Categories {
  name: string
  slug: string
}

export const Header = (async () => {
  const categories = await getAllCategories()
  return (
    <header className="max-w-[1440px] mx-auto flex items-center justify-between py-6 px-4 lg:px-20">
      <Link href="#">
        <Image src="/logo.svg" alt="" width={170} height={42} priority />
      </Link>
      <nav className="hidden lg:inline">
        <ul className="flex flex-row items-center gap-4 text-lg">
          {categories.map((categories: Categories) => (
            <li
              className="relative after:absolute after:w-1 after:h-1 after:rounded-full after:-right-2.5 after:top-1/2 after:-translate-y-1/2 after:bg-current"
              key={categories.name}
            >
              <Link href={`category/` + categories.slug} key={categories.name}>
                {categories.name}
              </Link>
            </li>
          ))}
          <li className="relative after:absolute after:w-1 after:h-1 after:rounded-full after:-right-2.5 after:top-1/2 after:-translate-y-1/2 after:bg-current">
            <Link href="https://discord.com/channels/381092165729910786/">
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
            <Link href="https://github.com/skni-kod/">
              <Image src="/github.svg" alt="" width={30} height={30} priority />
            </Link>
          </li>
        </ul>
      </nav>
      <button className="lg:hidden">
        <Image src="/hamburger.svg" alt="" width={42} height={42} priority />
      </button>
    </header>
  )
}) as unknown as () => JSX.Element
