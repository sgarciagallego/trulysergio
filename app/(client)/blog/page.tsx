import { client } from "../../../sanity/lib/client"
import { Post, Tag } from "../../utils/interface"
import Card from "../../components/organisms/card/card"
import Group from "../../components/templates/group/group"

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

export default async function TagPage() {
  const tags: Tag[] = await fetchTags()
  const posts: Post[] = await fetchPosts()

  return (
    <>
      {tags?.length > 0 && tags?.map(tag => {
        const count = posts.filter(post => post.tags.length === 1 && post.tags[0]._id === tag._id).length

        if (count > 0) {
          return (
            <Group
              key={tag._id}
              heading={tag.tagName}
              counter={count === 1 ? `${count} article` : `${count} articles`}
            >
              {posts.filter(post => post.tags.length === 1 && post.tags[0]._id === tag._id).map(post => (
                <Card
                  key={post._id}
                  heading={post?.title}
                  dateTime={(new Date(post?.datePublished).toLocaleString(
                    "en-GB",
                    { month: "long", day: "numeric", year: "numeric" }
                  ))}
                  excerpt={post?.excerpt}
                  href={`blog/${post?.slug.current}`}
                />
              ))}
            </Group>
          )
        }
      })}
    </>
  )
}