import {
  characterSchema,
  charactersSchema,
  charactersPreviewSchema,
  episodesSchema
} from "../../../models";

const API_URL = process.env.API_URL;

export async function getAllCharacter(page: number) {
  const res = await fetch(`${API_URL}/character/?page=${page}`, {
    method: "GET",
  });
  if(!res.ok) return null;
  const json = await res.json();
  if(!charactersSchema.safeParse(json.results).success) throw 'invalid_characters_schema';
  const data = charactersPreviewSchema.parse(json.results);
  return data;
}

export async function getCharacter(id: string) {
  const res = await fetch(`${API_URL}/character/${id}`, {
    method: "GET",
  });
  if(!res.ok) return null;
  const json = await res.json();
  if(!characterSchema.safeParse(json).success) throw 'invalid_character_schema';
  const data = characterSchema.parse(json);
  return data;
}

export async function getMultipleEpisode(epArray: number[]) {
  const res = await fetch(`${API_URL}/episode/${epArray}`, {
    method: "GET",
  });
  if(!res.ok) return null;
  const json = await res.json();
  const data = episodesSchema.parse(json);
  return data;
}

export default {
  getAllCharacter,
  getCharacter,
  getMultipleEpisode
}