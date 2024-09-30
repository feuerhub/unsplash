import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: '25GwD0INFm45B7wO6NkAiM07yvwuZXTv77ozWx923h0',
});

export const searchImages = async (query: string) => {
  try {
    const { response } = await unsplash.search.getPhotos({ query, perPage: 8 });
    return response?.results || []; 
  } catch (error) {
    console.error('Error fetching search results:', error);
    return []; 
  }
};
export const getCollections = async ({page = 1, perPage = 8}: {page: number, perPage: number}) => {
  try {
    const { response } = await unsplash.collections.list({ page: page, perPage: perPage });
    return response?.results || [];
  } catch (error) {
    console.error('Error fetching collections:', error);
    return []; 
  }
};

export const getImageDetails = async (id: string) => {
  const result = await unsplash.photos.get({ photoId: id });
  return result.response;
};

export const getCollectionDetails = async (id: string) => {
  const result = await unsplash.collections.getPhotos({ collectionId: id });
  return result.response;
};

export const searchCollections = async (query: string, collectionsPage: number = 1) => {
  const result = await unsplash.search.getCollections({ query, page: collectionsPage });
  return result.response;
};

export const addPhotoToCollection = async (collectionId: string, photoId: string) => {
    const response = await fetch(`https://api.unsplash.com/collections/${collectionId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Client-ID 25GwD0INFm45B7wO6NkAiM07yvwuZXTv77ozWx923h0'
      },
      body: JSON.stringify({
        photo_id: photoId
      })
    });
    const data = await response.json();
    return data;
};
export const removePhotoFromCollection = async (collectionId: string, photoId: string) => {
  const response = await fetch(`https://api.unsplash.com/collections/${collectionId}/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Client-ID 25GwD0INFm45B7wO6NkAiM07yvwuZXTv77ozWx923h0'
    },
    body: JSON.stringify({
      photo_id: photoId
    })
  });

  if (!response.ok) {
      throw new Error('Failed to remove photo from collection');
  }

  const data = await response.json();
  return data;
};
