const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

//Criando mecanismo para limitar geração de pokemons


function convertPokemonToLi(pokemon){
  return `
        <li class="pokemon ${pokemon.type}">
              <span class="number">#${pokemon.number}</span>
              <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    
                    <img src="${pokemon.photo}" 
                          alt="${pokemon.name}">
                </div>
        </li>
      `     
}

// pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)

/*
function convertPokemonToLi(pokemon) {
  return `
          <li class="pokemon ${pokemon.type} ">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                  <div class="detail">
                      <ol class="types">
                            ${pokemon.types
                              .map(
                                type =>
                                  `<li class="type ${pokemon.type}">${type}</li>`
                              )
                              .join('')}
                      </ol>
                      
                      <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                  </div>
          </li>       
      
      `
}
*/


// Função de execução da paginação
function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('')
          pokemonList.innerHTML += newHtml
  })
}

loadPokemonItens(offset, limit) //Carrega os primeiros itens.

//Função ao clicar mudar de pagina
loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNextPage = offset + limit

  if (qtdRecordsWithNextPage >= maxRecords) { 
      const newLimit = maxRecords - offset  
      loadPokemonItens(offset, newLimit)
      
      loadMoreButton.parentElement.removeChild(loadMoreButton)  //removendo botão ao final da lista
  } else {
      loadPokemonItens(offset, limit)
  }
})

/*
    pokeApi.getPokemons().then((pokemons = []) => {         //lista de 10 pokemons em Objeto
        Substituindo o laço FOR pelo map, que tem funcção de lista:
      const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon))
          return convertPokemonToLi(pokemon)              //tranformar em um item de lista HTML
          return pokemon.name                             //tranformar um pokemon em uma string  

      const newHtml = newList.join('') 
      pokemonList.innerHTML += newHtml

  */

/*
Resumindo função acima:
pokeApi.getPokemons().then((pokemons = []) => {
  const newHtml = pokemons.map(convertPokemonToLi).join('')
  pokemonList.innerHTML = newHtml
})
 */ 

/*
    -------------- FOR --------------
    const listItems = []
      for (let i = 0; i < pokemons.length; i++) {
      const pokemon = pokemons[i]
      pokemonList.innerHTML += convertPokemonToLi(pokemon)
        listItems.push(convertPokemonToLi(pokemon)) //lista de 10 pokemons em HTML
    }    
     console.log(listItems)
    
    */
