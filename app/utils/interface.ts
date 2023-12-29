export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  datePublished: string;
  excerpt: string;
  body: any;
  tags: Array<Tag>;
}

export interface Tag {
  _id: string;
  tagName: string;
  slug: { current: string };
}