import type { Metadata } from "next"
import Image from "next/image"
import { client } from "../../../../../sanity/lib/client"
import { urlForImage } from "../../../../../sanity/lib/image"
import { Tag } from "../../../../utils/interface"
import { PortableText } from "@portabletext/react"
import Intro from "../../../../components/molecules/intro/intro"
import PostBody from "../../../../components/templates/postBody/postBody"
import TagMap from "../../../../components/molecules/tagMap/tagMap"
import Label from "../../../../components/atoms/tag/tag"
import { notFound } from "next/navigation"

interface Params {
  params: {
    post: string
  }
}

async function fetchPosts(post: string) {
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

export async function generateMetadata( { params }: Params ): Promise<Metadata> {
  const post = await fetchPosts(params?.post)

  return {
    title: post?.title,
    description: post?.excerpt,
  }
}

export const revalidate = 60

export default async function PostPage( { params }: Params ) {
  const post = await fetchPosts(params?.post)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Intro
        subtitle={post?.tags[0].tagName}
      >
        {post?.title}
      </Intro>
      <PostBody
        lastUpdated={
          (new Date(post?.datePublished).toLocaleString(
            "en-GB", 
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          ))
        }
        pageViews={2}
      >
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