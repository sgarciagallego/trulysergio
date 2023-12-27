import { client } from "../../../../sanity/lib/client"
import Intro from "../../../components/templates/intro/intro"
import PostBody from "../../../components/templates/postBody/postBody"

interface Params {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const query = `
    *[_type=="post" && slug.current == "${slug}"] [0] {
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

  const post = await client.fetch(query)

  return post
}

export default async function PostPage({ params }: Params) {
  console.log(params, "params")
  const post = await getPost(params?.slug)
  console.log(post, "post")

  return (
    <>
      <Intro
        element={""}
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
        {post?.body}
      </PostBody>
    </>
  )
}