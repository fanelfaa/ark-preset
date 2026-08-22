import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const solid = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/solid" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const react = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/react" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const vue = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/vue" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  solid,
  react,
  vue,
};
