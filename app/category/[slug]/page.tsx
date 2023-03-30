import Image from 'next/image'
import Link from 'next/link'

async function getPost(params: any) {
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
          posts(
            where: {category: {Category: {slug: "${params.slug}"}}}
            orderBy: createdAt_DESC
            ) {
            featuredImage {
              url
            }
            title
            slug
            excerpt
            category {
              ... on Category {
                name
              }
            }
          }
        }
        `,
        variables: {
          slug: params.slug,
        },
      }),
    }
  )
  const { data } = await response.json()
  return data.posts
}

interface Post {
  title: string
  slug: string
  excerpt: string
  featuredImage: {
    url: string
  }
  category: {
    name: string
  }
}

export default async function Page({ params }: any) {
  const posts = await getPost(params)

  return (
    <main className="max-w[1440] mx-auto flexjustify-between py-6 px-4 lg:px-20">
      {posts[0] ? (
        <section className="max-w[1440] gap-4 mx-auto flex flex-wrap">
          {posts.map((post: Post) => (
            <div className="flex flex-col max-w-[416px]" key={post.title}>
              <div className="h-[300px] w-full relative px-4">
                <Image
                  src={post.featuredImage.url}
                  alt=""
                  fill
                  className="!m-0 rounded-sm object-cover"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                />
              </div>
              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-row gap-4">
                  <span className="px-2 py-1 bg-[#222] text-white">
                    {post.category.name}
                  </span>
                  <span className="py-1">5 min Czytania</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="flex">
                  <Link
                    href={`post/` + post.slug}
                    className="rounded-sm border-solid border-2 py-2 px-4 border-black"
                    aria-label={`Czytaj artykuł ` + post.title}
                  >
                    Czytaj więcej →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <h1 className="flex justify-center text-lg h-full">
          Nie znaleziono artykułów 😮😧
        </h1>
      )}
    </main>
  )
}

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`
