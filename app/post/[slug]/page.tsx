import Markdown from 'markdown-to-jsx'
import Image from 'next/image'

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
              post(where: {slug: "${params.slug}"}) {
                featuredImage {
                  url
                }
                title
                slug
                content
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
    <article className="mx-auto px-4 prose md:prose-lg prose-slate">
      <div className="h-[240px] sm:h-[300px] md:h-[400px] w-full relative mb-10">
        <Image
          src={post.featuredImage.url}
          alt=""
          layout="fill"
          objectFit="cover"
          className="!m-0"
        />
      </div>
      <h1 className="">{post.title}</h1>

      <Markdown>{post.content}</Markdown>
    </article>
  )
}
