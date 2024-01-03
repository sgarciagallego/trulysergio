import { client } from "../../sanity/lib/client"
import { Post } from "../utils/interface"
import { Tag } from "../utils/interface"
import Intro from "../components/organisms/intro/intro"
import Grid from "../components/organisms/grid/grid"
import Card from "../components/organisms/card/card"
import TagContainer from "../components/templates/tagContainer/tagContainer"
import Label from "../components/atoms/label/label"
import Link from "next/link"

export const metadata = {
  title: "Truly Sergio",
}

async function fetchPosts() {
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

export default async function HomePage() {
  const posts: Post[] = await fetchPosts()
  const tags: Tag[] = await fetchTags()

  return (
    <>
      <Intro>
        Sergio Garcia Gallego
      </Intro>
      <Grid>
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
                  "en-GB", 
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                ))
              }
              excerpt={post.excerpt}
              href={`/blog/${tags.find(tag => tag._id === post.tags[0]._id).slug.current}/${post?.slug.current}`}
            />
          ))}
        </section>
        <aside>
          <section>
            <h2>About me</h2>
            <p>Hi! I&apos;m Sergio, a Designer Developer for an education provider and co-founder for a branding agency. My aim for this blog is to help people revolving around the technical and creative industries build confidence and overcome challenges in their professional development.</p>
          </section>
          <section>
            <h2>Categories</h2>
            <TagContainer>
              {tags?.length > 0 && tags?.map(tag => (
                <Link 
                  key={tag?._id}
                  href={`/blog/${tag.slug.current}`}
                  style={{textDecoration: "none"}}
                >
                  <Label>{tag.tagName}</Label>
                </Link>
              ))}
            </TagContainer>
          </section>
        </aside>
      </Grid>
    </>
  )
}
