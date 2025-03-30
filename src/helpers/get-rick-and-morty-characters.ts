import axios from "axios"

export interface Character {
  nome: string
  genero: string
  avatar: string
  especie: string
}

export async function getRickAndMortyCharacters(): Promise<Character[]> {
  try {
    const familyNames = [
      "Rick Sanchez",
      "Morty Smith",
      "Summer Smith",
      "Beth Smith",
      "Jerry Smith",
    ]

    // Otimização: como sabemos que os IDs principais são 1-5, podemos fazer uma única chamada
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/[1,2,3,4,5]`
    )

    const familyMembers = response.data.map((character: any) => ({
      nome: character.name,
      genero: character.gender === "Male" ? "Homem" : "Mulher",
      avatar: character.image,
      especie: character.species === "Human" ? "Humano" : character.species,
    }))

    // Filtro adicional para garantir apenas os personagens desejados
    return familyMembers
      .filter((char: Character) => familyNames.includes(char.nome))
      .sort(
        (a: any, b: any) =>
          familyNames.indexOf(a.nome) - familyNames.indexOf(b.nome)
      )
  } catch (error) {
    console.error("Erro ao buscar personagens:", error)
    throw error
  }
}
