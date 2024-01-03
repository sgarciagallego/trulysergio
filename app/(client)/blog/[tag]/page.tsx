import type { Metadata } from "next"
import { client } from "../../../../sanity/lib/client"
import { Post } from "../../../utils/interface"
import Card from "../../../components/organisms/card/card"
import Group from "../../../components/templates/group/group"

interface Params {
  params: {
    tag: string
  }
}

async function fetchTag(tag: string) {
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

export const revalidate = 60

export async function generateMetadata( { params }: Params ): Promise<Metadata> {
  const tag = await fetchTag(params?.tag)

  return {
    title: `${tag?.tagName} articles`,
    description: "",
  }
}

export default async function TagPage( {params} : Params ) {
  const tag = await fetchTag(params?.tag)
  const posts: Post[] = await fetchPosts()

  const count = posts.filter(post => post.tags.some(tag => tag.slug.current === params?.tag)).length

  return (
    <>
      <Group 
        heading={tag?.tagName}
        counter={count === 1 ? `${count} article` : `${count} articles`}
      >
        {posts?.filter(post => post?.tags?.find(tag => tag.slug.current === params?.tag)).map(post => (
          <Card
            key={post?._id}
            heading={post?.title}
            dateTime={(new Date(post?.datePublished).toLocaleString(
              "en-GB",
              { month: "long", day: "numeric", year: "numeric" }
            ))}
            excerpt={post?.excerpt}
            href={`/blog/${tag?.slug.current}/${post?.slug.current}`}
          />
        ))}
      </Group>
    </>
  )
}