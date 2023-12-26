import { client } from "../../../sanity/lib/client"
import { Post } from "../../utils/interface"
import Intro from "../../components/molecules/intro/intro"
import TwoCol from "../../components/templates/twoCol/twoCol"
import Card from "../../components/organisms/card/card"
import LabelContainer from "../../components/templates/labelContainer/labelContainer"
import Tag from "../../components/atoms/tag/tag"

export const metadata = {
  title: "Blog",
  description: ""
}

async function getPosts() {
  const query = `
    *[_type == "post"] {
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

  const data = await client.fetch(query)

  return data
}

export const revalidate = 60

export default async function BlogPage() {
  const posts: Post[] = await getPosts()

  console.log(posts, "posts")

  return (
    <>
      <Intro
        element={""}
        subtitle={""}
      >
        Blog
      </Intro>
      <TwoCol>
        {posts?.length > 0 && posts?.map(post => (
          <Card
            key={post._id}  
            element={""}
            heading={post.title}
            dateTime={
              (new Date(post.datePublished).toLocaleString(
                "en-US", 
                {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }
              ))
            }
            excerpt={post.excerpt}
            href={`blog/${post.slug.current}`}
          >
            <LabelContainer>
              {post?.tags?.map(tag => (
                <Tag key={tag?._id}>{tag?.tagName}</Tag>
              ))}
            </LabelContainer>
          </Card>
        ))}
      </TwoCol>
    </>
  )
}