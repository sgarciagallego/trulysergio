import { client } from "../sanity/lib/client"
import { Post, Tag } from "./utils/interface"

async function fetchPosts() {
  const query = `
    *[_type=="post"] {
      _id,
      title,
      slug,
      datePublished,
      excerpt,
      body,
      tags[]-> {
        _id,
        slug,
        tagName
      }
    }
  `

  const posts = await client.fetch(query)
  return posts
}

async function fetchTags() {
  const query = `
    *[_type=="tag"] {
      _id,
      slug,
      tagName
    }
  `

  const tags = await client.fetch(query)
  return tags
}

export const revalidate = 60

export default async function sitemap() {
  const baseUrl = "https://trulysergio.com"

  // fetch posts
  const posts: Post[] = await fetchPosts()
  const tags: Tag[] = await fetchTags()

  // map through posts
  const postUrls = posts?.map(post => {
    return {
      url: `${baseUrl}/blog/${tags?.find(tag => tag?._id === post?.tags[0]._id).slug.current}/${post?.slug.current}`,
      lastModified: new Date(post?.datePublished),
      changeFrequency: "weekly",
      priority: 0.7
    }
  }) ?? []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1.0
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7
    },
    ...postUrls,
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8
    },
  ]
}