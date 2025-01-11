export type TNew = {
  content: string;
  publishedAt: string;
  url: string;
  description: string;
  title: string;
  author: string;
  source: {
    id: string | null;
    name: string;
  };
};
