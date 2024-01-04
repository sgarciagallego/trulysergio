import type { Metadata } from "next"
import { client } from "../../../../sanity/lib/client"
import { Post } from "../../../utils/interface"
import Card from "../../../components/organisms/card/card"
import Group from "../../../components/templates/group/group"
import { notFound } from "next/navigation"

interface Params {
  params: {
    tag: string
  }
}

async function fetchPosts() {
  const query = `
    *[_type=="post"] {
      _id,
      title,
      slug,
      datePublished,
      excerpt,
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

async function fetchTags(tag: string) {
  const query = `
    *[_type=="tag" && slug.current == "${tag}"] [0] {
      _id,
      slug,
      tagName,
    }
  `

  const tags = await client.fetch(query)
  return tags
}

export async function generateMetadata( { params }: Params ): Promise<Metadata> {
  const tag = await fetchTags(params?.tag)

  return {
    title: `${tag?.tagName} articles`,
    description: "",
  }
}

export const revalidate = 60

export default async function TagPage( {params} : Params ) {
  const posts: Post[] = await fetchPosts()
  const tags = await fetchTags(params?.tag)

  const count = posts.filter(post => post?.tags.find(tag => tag?.slug.current === params?.tag)).length

  if (!tags) {
    notFound()
  }

  return (
    <>
      <Group 
        heading={tags?.tagName}
        counter={count === 1 ? `${count} article` : `${count} articles`}
      >
        {posts?.filter(post => post?.tags?.find(tag => tag.slug.current === params?.tag)).map(post => (
          <Card
            key={post?._id}
            alt
            heading={post?.title}
            dateTime={(new Date(post?.datePublished).toLocaleString(
              "en-GB",
              { month: "long", day: "numeric", year: "numeric" }
            ))}
            excerpt={post?.excerpt}
            href={`/blog/${tags?.slug.current}/${post?.slug.current}`}
          />
        ))}
      </Group>
    </>
  )
}