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

export default async function Header() {
  const categories = await getAllCategories()
  return (
    <header className="max-w-[1440px] mx-auto flex items-center justify-between py-6 px-4 lg:px-20">
      <Link href="#">
        <Image src="/logo.svg" alt="" width={170} height={42} priority />
      </Link>
      <nav className="hidden lg:inline">
        <ul className="flex flex-row items-center gap-2 text-lg">
          {categories.map((categories: Categories) => (
            <>
              <li>
                <Link
                  href={`category/` + categories.slug}
                  key={categories.name}
                >
                  {categories.name}
                </Link>
              </li>
              <p>·</p>
            </>
          ))}

          <Link href="https://discord.com/channels/381092165729910786/">
            <Image src="/discord.svg" alt="" width={30} height={30} priority />
          </Link>
          <p>·</p>
          <Link href="https://github.com/skni-kod/">
            <Image src="/github.svg" alt="" width={30} height={30} priority />
          </Link>
        </ul>
      </nav>
      <button className="lg:hidden">
        <Image src="/hamburger.svg" alt="" width={42} height={42} priority />
      </button>
    </header>
  )
}
