import { client } from "../../sanity/lib/client"
import { Post } from "../utils/interface"
import Intro from "../components/molecules/intro/intro"
import TwoCol from "../components/templates/twoCol/twoCol"
import Card from "../components/organisms/card/card"
import TagContainer from "../components/templates/tagContainer/tagContainer"
import Tag from "../components/atoms/tag/tag"

export const metadata = {
  title: "Truly Sergio",
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

export default async function HomePage() {
  const posts: Post[] = await getPosts()

  return (
    <>
      <Intro
        element={""}
        subtitle={""}
      >
        Sergio Garcia Gallego
      </Intro>
      <TwoCol useMin={false}>
        <section>
          <h2>Recently published</h2>
          {posts?.length > 0 && posts?.map(post => (
            <Card
              key={post._id}
              useAlt={true}
              element={"h3"}
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
              children={""}
            />
          ))}
        </section>
        <aside>
          <section>
            <h2>About me</h2>
            <p>Hi! I'm Sergio, a Designer Developer for an education provider and co-founder for a branding agency. My aim for this blog is to help people revolving around the technical and creative industries build confidence and overcome challenges in their professional development.</p>
          </section>
          <section>
            <h2>Categories</h2>
            <TagContainer>
              {posts?.length > 0 && posts.flatMap(post => post?.tags).map(tag => (
                <Tag key={tag?._id}>{tag?.tagName}</Tag>
              ))}
            </TagContainer>
          </section>
        </aside>
      </TwoCol>
    </>
  )
}
