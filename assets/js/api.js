const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=00";

const PokemonList = {};

let html = "";

const getAPI = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((pokemons) => {
      (html = ""),
        pokemons.results.forEach((pokemon) => {
          obtenerPokemon(pokemon);
        }),
        pagination(pokemons);
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

const pagination = (info) => {
  let html = "";
  html += `<li class="page-item ${
    info.previous == null ? "disabled" : ""
  }"><a class="page-link" onclick="getAPI('${info.previous}')">Prev</a></li>`;

  html += `<li class="page-item ${
    info.next == null ? "disabled" : ""
  }"><a class="page-link" onclick="getAPI('${info.next}')">Next</a></li>`;

  document.getElementById("pagination").innerHTML = html;
};

const fillData = (data) => {
  html += `<div class="col">
        <div class="card h-100 text-white  mb-3">
        <span class="card-id">#${data.id}</span>
        <img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">
        <div class="card-body ">
        <h5 class="card-title text-capitalize">${data.name}</h5>
        <p class="card-text">Height: ${data.height}\n Weight: ${data.weight}</p>
        </div>
        </div>
        </div>`;
  document.getElementById("characters").innerHTML = html;
};
getAPI(API);
