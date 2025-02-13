import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const PokemonFetcher = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      console.log(res.data);
      setPokemonData(res.data);
      setError(null);
    } catch (err) {
      setError("Pokémon not found!");
      setPokemonData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (pokemonName) {
      fetchPokemon();
    }
  };

  return (
    <div>
      <nav className="flex p-5 justify-between items-center">
        <h1 className="text-3xl">PokéDex</h1>
        <form
          onSubmit={handleSearch}
          className="flex items-center rounded-lg w-1/3"
        >
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Search Pokemon"
            className="bg-white text-black px-2 py-1 rounded-lg outline-none w-full"
          />
          <button type="submit" className="p-2 mx-2 text-2xl">
            <IoSearch />
          </button>
        </form>
      </nav>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemonData && (
        <div className="p-5 m-5 bg-gray-800 rounded-lg">
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="w-50"
          />
          <h1 className="capitalize text-2xl">{pokemonData.name}</h1>

          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <div>
            Abilities:
            <ul>
              {pokemonData.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonFetcher;
