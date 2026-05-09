import  { createContext, useEffect, useState, type PropsWithChildren } from 'react'
import type { Hero } from '../types/hero.interface';

interface FavoriteHeroContext {
    //state
    favorites: Hero[];
    favoriteCount: number;

    //methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}


// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);


const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}


export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const toggleFavorite = (hero: Hero) => {
        //se usa some para verificar si el héroe ya está en la lista de favoritos, 
        // si es así, se elimina de la lista, de lo contrario se agrega a la lista
        if (favorites.some(fav => fav.id === hero.id)) {
            setFavorites(favorites.filter(fav => fav.id !== hero.id));
        } else {
            setFavorites([...favorites, hero]);
        }
    }

    const isFavorite = (hero: Hero) => {
        //retorna true si el héroe está en la lista de favoritos, de lo contrario false
        return favorites.some(fav => fav.id === hero.id);
    }

//cada vez que cambia la lista de favoritos, se guarda en el localStorage para persistir los datos entre sesiones
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));

    }, [favorites])

    return (
        <FavoriteHeroContext value={{
            favoriteCount: favorites.length,
            favorites: favorites,
            //methods   
            isFavorite: isFavorite,
            toggleFavorite: toggleFavorite,
        }}
        >
            {children}
        </FavoriteHeroContext>
    )
}