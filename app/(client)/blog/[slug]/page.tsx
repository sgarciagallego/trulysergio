import { PortableText } from "@portabletext/react"
import { client } from "../../../../sanity/lib/client"
import { Tag } from "../../../utils/interface"
import Intro from "../../../components/templates/intro/intro"
import PostBody from "../../../components/templates/postBody/postBody"
import TagContainer from "../../../components/templates/tagContainer/tagContainer"
import Label from "../../../components/atoms/label/label"

interface Params {
  params: {
    slug: string
  }
}

export const revalidate = 60

async function getPost(slug: string) {
  const query = `
    *[_type=="post" && slug.current == "${slug}"] [0] {
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

  const post = await client.fetch(query)

  return post
}

export default async function PostPage({ params }: Params) {
  const post = await getPost(params?.slug)

  return (
    <>
      <Intro
        subtitle={
          (new Date(post?.datePublished).toLocaleString(
            "en-GB", 
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          ))
        }
      >
        {post?.title}
      </Intro>
      <PostBody>
        <PortableText 
          value={post?.body}
        />
        <TagContainer>
          {post?.tags?.map((label: Tag) => (
            <Label key={label._id}>{label.tagName}</Label>
          ))}
        </TagContainer>
      </PostBody>
    </>
  )
}