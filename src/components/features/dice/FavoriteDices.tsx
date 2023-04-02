import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const favoriteDicesAtom = atom<string[]>(['1d100', '1d6']);

export const useFavoriteDices = () => {
  const [favoriteDices, setFavoriteDices] = useAtom(favoriteDicesAtom);

  useEffect(() => {
    const storage = localStorage.getItem('favoriteDices');
    if (storage === null) return;
    setFavoriteDices(JSON.parse(storage) as string[]);
  }, [setFavoriteDices]);

  useEffect(() => {
    localStorage.setItem('favoriteDices', JSON.stringify(favoriteDices));
  }, [favoriteDices]);

  return [favoriteDices, setFavoriteDices] as const;
};
