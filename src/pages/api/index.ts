import { charactersSchema, locationSchema, episodeSchema } from "../../../models";

const API_URL = process.env.API_URL;

export async function getAllCharacter(page: number) {
  const res = await fetch(`${API_URL}character/?page=${page}`, {
    method: "GET",
  })
  if(!res.ok) return undefined;
  const json = await res.json();
  if(!charactersSchema.safeParse(json.results).success) throw 'invalid_character_schema';
  const data = charactersSchema.parse(json.results);
  return data;
}

export default {
  getAllCharacter
}