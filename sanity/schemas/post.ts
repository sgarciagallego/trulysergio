import { Rule } from "sanity"

export const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "datePublished",
      title: "Date Published",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule: Rule) => Rule.min(150).error("150+ characters"),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { 
          type: "image",
          fields: [
            {
              name: "alt",
              title: "Alternative text",
              type: "text",
            },
          ]
        }
      ]
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ 
        type: "reference", 
        to: [{ type: "tag" }] 
      }]
    },
  ]
}