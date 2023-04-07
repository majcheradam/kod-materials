import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import { shimmer, toBase64 } from '@/lib/image-blur'

async function getPost(params: any) {
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
              post(where: {slug: "${params.slug}"}) {
                featuredImage {
                  url
                }
                title
                slug
                content
                category {
                  ... on Category {
                    name
                  }
                }
              }
          }`,
        variables: {
          slug: params.slug,
        },
      }),
    }
  )
  const { data } = await response.json()
  return data.post
}

export default async function Page({ params }: any) {
  const post = await getPost(params)

  return (
    <article className="mx-auto mb-10 px-4 md:px-0 prose md:prose-lg prose-slate">
      <div className="h-[240px] sm:h-[300px] md:h-[400px] w-full relative mb-10">
        <Image
          src={post.featuredImage.url}
          alt=""
          fill
          className="!m-0 object-cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
        />
      </div>
      <div className="flex flex-row gap-4 mb-6">
        <span className="px-2 py-1 bg-[#222] text-white">
          {post.category.name}
        </span>
        <span className="py-1">5 min Czytania</span>
      </div>
      <h1 className="">{post.title}</h1>
      <Markdown>{post.content}</Markdown>
    </article>
  )
}
