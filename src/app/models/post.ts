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
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Date;
  id?: number | null;
}
