// Types

type Post = {
  featuredImage: { url: string }
  title: string
  slug: string
  content?: any
  excerpt?: string
  category: { name: string }
}

type Params = {
  slug: string
}

export type Categories = {
  name: string
  slug: string
}

// Queries

async function fetchGraphQL(query: string, variables?: any) {
  const response = await fetch(
    'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clfqi8une019a01uebyhb36aq/master',
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    }
  )
  const { data } = await response.json()
  return data
}

export async function getPostBySlug(params: Params): Promise<Post> {
  const { post } = await fetchGraphQL(
    `
    query GetPostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        featuredImage { url }
        title
        slug
        content
        category { ... on Category { name } }
      }
    }
  `,
    { slug: params.slug }
  )
  return post
}

export async function getPostByCategory(params: Params): Promise<Post[]> {
  const { posts } = await fetchGraphQL(
    `
    query GetPostsByCategory($slug: String!) {
      posts(where: { category: { Category: { slug: $slug } } }, orderBy: createdAt_DESC) {
        featuredImage { url }
        title
        slug
        excerpt
        category { ... on Category { name } }
      }
    }
  `,
    { slug: params.slug }
  )
  return posts
}

export async function getAllPosts(): Promise<Post[]> {
  const { posts } = await fetchGraphQL(`
    query GetAllPosts {
      posts(orderBy: createdAt_DESC, first: 18) {
        featuredImage { url }
        title
        slug
        excerpt
        category { ... on Category { name } }
      }
    }
  `)
  return posts
}

export async function getAllCategories(): Promise<Categories[]> {
  const { categories } = await fetchGraphQL(`
    query GetAllCategories {
      categories {
        name
        slug
      }
    }
  `)
  return categories
}
