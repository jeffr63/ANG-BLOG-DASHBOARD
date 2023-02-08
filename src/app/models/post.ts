export interface Post {
  title: string;
  permalink: string;
  excerpt: string;
  category: {
    categoryId: number;
    category: string;
  };
  postImg: string;
  content: string;
  isFeatured: string;
  views: number;
  status: string;
  createdAt: Date;
  id?: number | null;
}
