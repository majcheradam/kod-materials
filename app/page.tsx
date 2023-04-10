import Image from 'next/image'
import Link from 'next/link'
import { shimmer, toBase64 } from '@/lib/image-blur'

async function getAllPosts() {
  const response = await fetch(
    'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clfqi8une019a01uebyhb36aq/master',
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{
          posts(orderBy: createdAt_DESC first: 18) {
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
          }`,
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

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="max-w-[1440px] mx-auto py-6 lg:px-20">
      <section className="max-w-[1440px] mx-auto gap-4 j flex lg:justify-start justify-center flex-wrap">
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
                <p className="line-clamp-2 text-[#444444]">{post.excerpt}</p>
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
    </main>
  )
}
