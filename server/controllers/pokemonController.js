const Pokemon = require("../models/Pokemon");

async function createPokemon(req, res) {
 try {
   const { name, type, level } = req.body;

   const newPokemon = new Pokemon({
     name,
     type,
     level,
   });

   const savedPokemon = await newPokemon.save();
   res.status(201).json(savedPokemon);
 } catch (error) {
  
   res.status(400).json({ message: error.message });
 }
}

async function getPokemonById(req, res) {

  try {

    const pokemon = await Pokemon.findById(req.params.id);

    if (!pokemon) {

      return res.status(404).json({
        mensagem: "Pokemon não encontrado."
      });

    }

    res.status(200).json(pokemon);

  } catch (error) {

    res.status(400).json({
      erro: error.message
    });

  }
}

async function listPokemon(req, res) {
 try {
  const { name, type, minLevel, sortBy, order = "asc", page = 1, limit = 10 } = req.query;
  const filter = {};

  if (name) {
    filter.name = new RegExp(name, "i");
  }

  if (type) {
    const typesArray = Array.isArray(type) ? type : type.split(",").map(t => t.trim());
    filter.type = { $in: typesArray };
  }

  if (minLevel) {
    filter.level = { $gte: Number(minLevel) };
  }

  const sortOptions = {};

  if (sortBy) {
    sortOptions[sortBy] = order === "desc" ? -1 : 1;
  }
  
   const pokemons = await Pokemon.find(filter).sort(sortOptions).skip((page - 1) * limit).limit(Number(limit));
   res.status(200).json(pokemons);
 } catch (error) {
   console.error("Erro ao listar Pokemons:", error.message);
   res.status(500).json({ error: "Erro ao listar Pokemons" });
 }
}

async function updatePokemon(req, res) {
 try {
   const updated = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
   });
   res.json(updated);
 } catch (err) {
   res.status(400).json({ erro: err.message });
 }
}

async function deletePokemon(req, res) {
 try {
   await Pokemon.findByIdAndDelete(req.params.id);
   res.json({ mensagem: "Pokemon deletado com sucesso." });
 } catch (err) {
   res.status(400).json({ erro: err.message });
 }
}

module.exports = { createPokemon, listPokemon, updatePokemon, deletePokemon, getPokemonById };