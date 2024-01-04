import { client } from "../../sanity/lib/client"
import { Post, Tag } from "../utils/interface"
import Label from "../components/atoms/tag/tag"
import TagMap from "../components/molecules/tagMap/tagMap"
import Intro from "../components/atoms/intro/intro"
import Grid from "../components/organisms/grid/grid"
import Card from "../components/organisms/card/card"

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
            <p>Hi! I&apos;m Sergio, a UX/UI Engineer for an education provider and co-founder of a branding agency. My only aim with this blog is to speak on experiences I&apos;ve learned from, personal and professional, and maybe you&apos;ll leave here more confident as a result.</p>
          </section>
          <section>
            <h2>Categories</h2>
            <TagMap>
              {tags?.length > 0 && tags?.map(tag => (
                <Label 
                  key={tag?._id} 
                  href={`/blog/${tag?.slug.current}`}
                >
                  {tag?.tagName}
                </Label>
              ))}
            </TagMap>
          </section>
        </aside>
      </Grid>
    </>
  )
}
