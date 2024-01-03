import type { Metadata } from "next"
import Image from "next/image"
import { client } from "../../../../../sanity/lib/client"
import { urlForImage } from "../../../../../sanity/lib/image"
import { Tag } from "../../../../utils/interface"
import { PortableText } from "@portabletext/react"
import Intro from "../../../../components/atoms/intro/intro"
import PostBody from "../../../../components/templates/postBody/postBody"
import TagMap from "../../../../components/molecules/tagMap/tagMap"
import Label from "../../../../components/atoms/tag/tag"

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
        <TagMap>
          {post?.tags?.map((label: Tag) => (
            <Label 
              key={label._id}
              href={`/blog/${label.slug.current}`}
            >{label.tagName}</Label>
          ))}
        </TagMap>
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