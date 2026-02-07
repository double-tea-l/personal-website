import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
    description: z.string().optional(),
  }),
});

// 相册可后续用 collection 或仅用 public/photos + 一页展示
export const collections = {
  blog,
};
