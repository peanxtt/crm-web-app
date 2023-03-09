import { z } from "zod"

export const characterPreviewSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  gender: z.string(),
})
export const charactersPreviewSchema = characterPreviewSchema.array();
export type charactersPreviewType = z.infer<typeof characterPreviewSchema>;

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string().optional(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string()
  }),
  location: z.object({
    name: z.string(),
    url: z.string()
  }),
  image: z.string().url(),
  episode: z.array(z.string().url()),
  url: z.string().url(),
  created: z.string()
});
export const charactersSchema = characterSchema.array();
export type characterType = z.infer<typeof characterSchema>;

export const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  dimension: z.string(),
  residents: z.array(z.string().url()),
  url: z.string().url(),
  created: z.string()
});
export type locationType = z.infer<typeof locationSchema>;

export const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  air_date: z.string(),
  episode: z.string(),
  characters: z.array(z.string().url()),
  url: z.string().url(),
  created: z.string()
});
export type episodeType = z.infer<typeof episodeSchema>;
export const episodesSchema = episodeSchema.array();