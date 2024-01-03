import type { Metadata } from "next"
import Image from "next/image"
import { client } from "../../../../../sanity/lib/client"
import { urlForImage } from "../../../../../sanity/lib/image"
import { Tag } from "../../../../utils/interface"
import { PortableText } from "@portabletext/react"
import Intro from "../../../../components/organisms/intro/intro"
import PostBody from "../../../../components/organisms/postBody/postBody"
import TagContainer from "../../../../components/templates/tagContainer/tagContainer"
import Label from "../../../../components/atoms/label/label"

interface Params {
  params: {
    post: string
  }
}

async function fetchPost(post: string) {
  const query = `
    *[_type=="post" && slug.current == "${post}"] [0] {
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

  const posts = await client.fetch(query)
  return posts
}

export const revalidate = 60

export async function generateMetadata( { params }: Params ): Promise<Metadata> {
  const post = await fetchPost(params?.post)

  return {
    title: post?.title,
    description: post?.excerpt,
  }
}

export default async function PostPage( { params }: Params ) {
  const post = await fetchPost(params?.post)

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
        components={myPortableTextComponents}
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

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlForImage(value)}
        alt="Post"
        width={700}
        height={700}
      />
    ),
  },
};