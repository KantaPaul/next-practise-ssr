import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'

export default function Home({ pokemon }) {
  return (
    <Layout title="Pokodex">
      <h1 className="text-center text-4xl mb-8">NextJs Pokodex</h1>
      <ul>
        {pokemon.map((result, index) => {
          return (
            <li key={index}>
              <Link href={`/pokemon?id=${index + 1}`}>
                <a className="border p-4 border-gray my-2 flex items-center text-lg bg-gray-200 rounded shadow-lg">
                  <Image src={result.image} width="80" height="80" alt={result.name} />
                  <p className="capitalize ml-3"><span className="font-bold mr-3">{index + 1}</span>{result.name}</p>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      let paddedIndex = ("00" + (index + 1)).slice(-3);
      let image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image
      }
    })
    return {
      props: { pokemon }
    }
  } catch (error) {
    console.log(error)
  }
}