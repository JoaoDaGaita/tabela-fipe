"use client"

import { useEffect, useState } from "react"
import {
  type Character,
  getRickAndMortyCharacters,
} from "../helpers/get-rick-and-morty-characters"
import { maskify } from "../helpers/maskify"
import { updateData } from "../helpers/update-data"
import { checkIfTheFirstLetterIsUppercase } from "@/helpers/chek-if-the-first-letter-is-uppercase"

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    console.log("EXERCÍCIO 1")
    console.log("-----------------------------------------------------------")

    console.log(
      '"4556364607935616" Execução do método maskify: →',
      maskify("4556364607935616")
    )
    console.log(
      '"64607935616" Execução do método maskify: →',
      maskify("64607935616")
    )
    console.log('"1" Execução do método maskify: →', maskify("1"))
    console.log('"" Execução do método maskify: →', maskify(""))
    console.log(
      '"Nanananananananananana Batman!" Execução do método maskify: →',
      maskify("Nanananananananananana Batman!")
    )
    console.log("-----------------------------------------------------------")

    console.log("EXERCÍCIO 2")
    console.log("-----------------------------------------------------------")
    console.log(
      updateData(
        { name: "Marcos", country: "Brasil", age: 22 },
        { country: "Japão", age: 33 }
      )
    )

    console.log(
      updateData(
        { name: "Marcos", country: "Brasil", age: 22 },
        { price: 89.9, amount: 15, description: "camiseta 100% algodão" }
      )
    )

    console.log(
      updateData(
        { name: "Rafael", country: "Chile", age: 42 },
        { name: "Camiseta Polo", price: 59.9, amount: 30 }
      )
    )

    console.log("----------------------------------------")

    console.log("EXERCÍCIO 3 mostrado na página home")
    getRickAndMortyCharacters()
      .then((data) => setCharacters(data))
      .catch(console.error)

    console.log("EXERCÍCIO 4")
    console.log("-----------------------------------------------------------")

    console.log(
      "Checando se o input 'Brasil' começa com letra maiúscula",
      checkIfTheFirstLetterIsUppercase("Brasil")
    )
    console.log(
      "Checando se o input 'mobiauto' começa com letra maiúscula",
      checkIfTheFirstLetterIsUppercase("mobiauto")
    )
    console.log(
      "Checando se o input 'xXx xXx' começa com letra maiúscula",
      checkIfTheFirstLetterIsUppercase("xXx xXx")
    )
    console.log(
      "Checando se o input 'xDD' começa com letra maiúscula",
      checkIfTheFirstLetterIsUppercase("xDD")
    )
    console.log(
      "Checando se o input 'Deu Certo!' começa com letra maiúscula",
      checkIfTheFirstLetterIsUppercase("Deu Certo!")
    )
    console.log("--------------------------------------------")
  }, [])

  return (
    <div>
      <h1>Personagens Rick and Morty</h1>
      <pre>{JSON.stringify(characters, null, 2)}</pre>
    </div>
  )
}
