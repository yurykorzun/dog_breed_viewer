const BASE_URL = 'https://dog.ceo';
const GET_ALL_BREEDS = `${BASE_URL}/api/breeds/list/all`;

export const getAllBreeds = async () => {
  const response = await fetch(GET_ALL_BREEDS);
  const data = await response.json();

  return data;
};

export const getBreedImage = async (name: string) => {
  const response = await fetch(`${BASE_URL}/api/breed/${name}/images/random`);
  const data = await response.json();
  return data;
};

export const getSubBreedImage = async (name: string, subbreed: string) => {
  const response = await fetch(
    `${BASE_URL}/api/breed/${name}/${subbreed}/images/random`,
  );
  const data = await response.json();
  return data;
};
