import React, {useContext} from 'react';

import {createContext, useState} from 'react';
import {getAllBreeds, getBreedImage, getSubBreedImage} from '../api/dogApi';

export interface Breed {
  name: string;
  subbreeds: string[];
}

interface BreedInfo {
  [name: string]: string;
}
interface SubBreedInfo {
  [name: string]: BreedInfo;
}

interface DogBreedContextType {
  breeds: Breed[];
  filteredBreeds: Breed[];
  isLoading: boolean;
  error: Error | null;
  breedInfo: BreedInfo;
  subBreedInfo: SubBreedInfo;
  fetchDogBreeds: () => void;
  filterBreeds: (searchTerm: string) => void;
  loadBreedImage: (breedName: string) => void;
  loadSubbreedImage: (breedName: string, subbreedName: string[]) => void;
}

const DogBreedContext = createContext<DogBreedContextType>({
  breeds: [],
  filteredBreeds: [],
  isLoading: false,
  error: null,
  breedInfo: {},
  subBreedInfo: {},
  fetchDogBreeds: () => {},
  filterBreeds: () => {},
  loadBreedImage: () => {},
  loadSubbreedImage: () => {},
});

const DogBreedProvider = ({children}: {children: React.ReactNode}) => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [breedInfo, setBreedInfo] = useState<BreedInfo>([]);
  const [subBreedInfo, setSubBreedInfo] = useState<SubBreedInfo>([]);

  const [filteredBreeds, setFilteredBreeds] = useState<Breed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchDogBreeds = async () => {
    setIsLoading(true);
    setError(null);

    const response = await getAllBreeds();

    const parsedResponse = Object.entries<string[]>(response.message);
    const parsedBreeds = parsedResponse.map(item => {
      const [name, subbreeds] = item;

      return {
        name,
        subbreeds,
      };
    });

    setBreeds(parsedBreeds);
    setFilteredBreeds(parsedBreeds);

    setIsLoading(false);
  };

  const filterBreeds = (searchTerm: string) => {
    if (searchTerm) {
      const filteredResult = breeds.filter(breed => {
        const val = searchTerm?.toLowerCase();

        return breed.name.toLowerCase().includes(val);
      });

      setFilteredBreeds(filteredResult);
    } else {
      setFilteredBreeds(breeds);
    }
  };

  const loadBreedImage = async (breedName: string) => {
    if (!breedInfo[breedName]) {
      const response = await getBreedImage(breedName);
      const image = response.message;

      setBreedInfo({...breedInfo, ...{[breedName]: image}});
    }
  };

  const loadSubbreedImage = async (
    breedName: string,
    subbreedNames: string[],
  ) => {
    const newState = {...subBreedInfo};
    for (const subbreedName of subbreedNames) {
      if (newState[breedName]?.[subbreedName]) {
        continue;
      }
      const response = await getSubBreedImage(breedName, subbreedName);
      const image = response.message;

      newState[breedName] = {...newState[breedName], [subbreedName]: image};
    }
    setSubBreedInfo(newState);
  };

  return (
    <DogBreedContext.Provider
      value={{
        breeds,
        filteredBreeds,
        isLoading,
        error,
        fetchDogBreeds,
        filterBreeds,
        loadBreedImage,
        loadSubbreedImage,
        breedInfo,
        subBreedInfo,
      }}>
      {children}
    </DogBreedContext.Provider>
  );
};

const useDogBreed = () => useContext(DogBreedContext);

export {DogBreedProvider, useDogBreed};
