import axios from "axios";

export async function listPokemon() {
  const { data } = await axios.get("http://localhost:8000/api/pokemon");
  
  return data;
}

export async function getPokemonById(id) {
  const { data } = await axios.get(
    `http://localhost:8000/api/pokemon/${id}`
  );

  return data;
}

export async function createPokemon(body) {
 const { data } = await axios.post("http://localhost:8000/api/pokemon", body);
 return data;
}