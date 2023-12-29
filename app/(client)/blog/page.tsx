import { client } from "../../../sanity/lib/client"
import { Post } from "../../utils/interface"
import Intro from "../../components/templates/intro/intro"
import TwoCol from "../../components/templates/twoCol/twoCol"
import Card from "../../components/organisms/card/card"
import TagContainer from "../../components/templates/tagContainer/tagContainer"
import Tag from "../../components/atoms/label/label"

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

  return (
    <>
      <Intro>
        Blog
      </Intro>
      <TwoCol useMin={true}>
        {posts?.length > 0 && posts?.map(post => (
          <Card
            useAlt={false}
            key={post._id}  
            element={""}
            heading={post.title}
            dateTime={
              (new Date(post.datePublished).toLocaleString(
                "en-GB", 
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
            <TagContainer>
              {post?.tags?.map(tag => (
                <Tag key={tag?._id}>{tag?.tagName}</Tag>
              ))}
            </TagContainer>
          </Card>
        ))}
      </TwoCol>
    </>
  )
}