import {
  characterSchema,
  charactersSchema,
  charactersPreviewSchema,
  episodeSchema,
  episodesSchema,
  charactersPreviewType
} from "../../../models";

const API_URL = process.env.API_URL;

export async function getCharacters() {
  const initial = await fetch(`${API_URL}/character`, {
    method: "GET",
  });
  if(!initial.ok) return null;
  const res = await initial.json();
  const pages = res.info.pages;
  let result: charactersPreviewType[] = [];
  for(let i = 1; i <= pages; i++) {
    const get = await fetch(`${API_URL}/character/?page=${i}`, {
      method: "GET",
    });

    if(!get.ok) continue;
    const res = await get.json();
    result.push(...res.results);
  }
  if(!charactersSchema.safeParse(result).success) throw 'invalid_characters_schema';
  const data = charactersPreviewSchema.parse(result);
  return data;
}

export async function getAllCharacter(page: number) {
  const res = await fetch(`${API_URL}/character/?page=${page}`, {
    method: "GET",
  });
  if(!res.ok) return null;
  const json = await res.json();
  console.log(json);
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

export async function getCharacterByName(name: string) {
  const res = await fetch(`${API_URL}/character/?name=${name}`, {
    method: "GET",
  });
  if(!res.ok) return null;
  const json = await res.json();
  if(!charactersSchema.safeParse(json).success) throw 'invalid_character_schema';
  const data = charactersSchema.parse(json.results);
  return data;
}

export async function getMultipleEpisode(epArray: number[]) {
  const res = await fetch(`${API_URL}/episode/${epArray}`, {
    method: "GET",
  });
  if(!res.ok) return null;
  const json = await res.json();
  console.log(json);
  if(Array.isArray(json)){
    return episodesSchema.parse(json);
  } else {
    return episodeSchema.parse(json);
  }
}

export default {
  getAllCharacter,
  getCharacter,
  getCharacters,
  getCharacterByName,
  getMultipleEpisode
}