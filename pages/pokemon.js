import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'

const Pokemon = ({ pokemon }) => {
    console.log(pokemon)
    return (
        <Layout title={pokemon.name}>
            <div className="text-center">
                <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
                <Image src={pokemon.image} alt={pokemon.name} width="250" height="250" />
            </div>
            <p><span className="font-bold mr-2">Height : </span>{pokemon.height}</p>
            <p><span className="font-bold mr-2">Weight : </span>{pokemon.weight}</p>
            <h2 className="mt-2 mb-2 text-2xl font-bold">Types</h2>
            <ul>
                {pokemon.types.map((type, index) => {
                    return <li key={index} className="mb-1 capitalize">{type.type.name}</li>
                })}
            </ul>
            <p className="mt-10 text-center">
                <Link href="/">
                    <a className="font-bold underline text-1xl">Go Home</a>
                </Link>
            </p>
        </Layout>
    );
}

export const getServerSideProps = async ({ query }) => {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await res.json();
        let paddedIndex = ("00" + id).slice(-3);
        let image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
        pokemon.image = image;
        return {
            props: { pokemon }
        }
    } catch (error) {
        console.log(error)
    }
}

export default Pokemon;