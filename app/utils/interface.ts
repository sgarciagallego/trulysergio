export interface Post {
  title: string;
  slug: { current: string };
  datePublished: string;
  excerpt: string;
  body: any;
  tags: Array<Tag>;
  _id: string;
}

export interface Tag {
  tagName: string;
  slug: { current: string };
  _id: string;
}