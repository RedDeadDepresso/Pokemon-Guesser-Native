import { useEffect, useState } from 'react';

const MAX_ID = 1025;

const useRandomPokemon = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null);

    const getRandomPokemon = async () => {
        setLoading(true);
        const id = Math.floor(Math.random() * MAX_ID) + 1;
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newData = await response.json();
            setData(newData);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRandomPokemon();
    }, []);

    return { loading, data, getRandomPokemon };
};

export default useRandomPokemon;
