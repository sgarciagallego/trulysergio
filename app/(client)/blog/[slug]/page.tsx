import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import { client } from "../../../../sanity/lib/client"
import { urlForImage } from "../../../../sanity/lib/image"
import { Tag } from "../../../utils/interface"
import { PortableText } from "@portabletext/react"
import Intro from "../../../components/templates/intro/intro"
import PostBody from "../../../components/organisms/postBody/postBody"
import TagContainer from "../../../components/templates/tagContainer/tagContainer"
import Label from "../../../components/atoms/label/label"

interface Params {
  params: {
    slug: string
  }
}

export const revalidate = 60

async function getPost(slug: string) {
  const query = `
    *[_type=="post" && slug.current == "${slug}"] [0] {
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

  const post = await client.fetch(query)

  return post
}

export async function generateMetadata( { params }: Params ): Promise<Metadata> {
  const post = await getPost(params?.slug)

  return {
    title: `${post?.title} | Truly Sergio`,
    description: post?.excerpt,
  }
}

export default async function PostPage( { params }: Params ) {
  const post = await getPost(params?.slug)

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