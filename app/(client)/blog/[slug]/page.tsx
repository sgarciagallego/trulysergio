import { client } from "../../../../sanity/lib/client"
import Intro from "../../../components/molecules/intro/intro"

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
        subtitle={"Blog"}
      >
        {post?.title}
      </Intro>
    </>
  )
}