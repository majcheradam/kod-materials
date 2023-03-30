import Image from 'next/image'
import Link from 'next/link'

async function getPost(params: any) {
  const response = await fetch(
    'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clfqi8une019a01uebyhb36aq/master',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{
          posts(where: {category: {Category: {slug: "${params.slug}"}}}) {
            featuredImage {
              url
            }
            title
            slug
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
              <div className="h-[300px] w-[416px] relative">
                <Image
                  src={post.featuredImage.url}
                  alt=""
                  fill
                  className="!m-0 rounded-sm object-cover"
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
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quod pariatur blanditiis est eius.
                  </p>
                </div>
                <div className="flex">
                  <Link
                    href={`post/` + post.slug}
                    className="rounded-sm border-solid border-2 py-2 px-4 border-black"
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
