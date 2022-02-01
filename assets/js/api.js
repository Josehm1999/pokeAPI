const API = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=00";

const PokemonList = {};

let html = "";

const getAPI = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((pokemons) => {
      pokemons.results.forEach((pokemon) => {
        obtenerPokemon(pokemon);
      });
    })
    .catch((error) => {
      console.log("Error with the API");
    });
};

const obtenerPokemon = (pokemon) => {
  let url = pokemon.url;
  fetch(url)
    .then((response) => response.json())
    .then((poke) => {
      fillData(poke);
    })
    .catch((error) => {
      console.log("Error with the API");
    });
};

const fillData = (data) => {
  html += '<div class="col">';
  html += '<div class="card h-100 text-white bg-primary mb-3">';
  html += `<img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`;
  html += '<div class="card-body ">';
  html += `<h5 class="card-title text-capitalize">${data.name}</h5>`;
  html += `<p class="card-text">Height: ${data.height}\n Weight: ${data.weight}</p>`;
  html += "</div>";
  html += "</div>";
  html += "</div>";
  document.getElementById("characters").innerHTML = html;
};
getAPI(API);
