import { defineCollection, z } from "astro:content";

const blogTagEnum = z.enum(["读书笔记", "日记"]);
export type BlogTag = z.infer<typeof blogTagEnum>;

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: blogTagEnum.optional().default("读书笔记"),
    draft: z.boolean().optional().default(false),
    description: z.string().optional(),
  }),
});

const shuoshuo = defineCollection({
  type: "content",
  schema: z.object({
    date: z.coerce.date(),
    /** Decap 存为 [{ image: path }]，也可手写为 string[] */
    images: z
      .array(z.union([z.string(), z.object({ image: z.string() })]))
      .optional()
      .default([]),
    musicUrl: z.string().optional(),
    musicTitle: z.string().optional(),
  }),
});

export const collections = {
  blog,
  shuoshuo,
};
