'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SearchBar } from '@/components';
import { searchImages } from '@/services/unsplashApi';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');

  const { data: images, isLoading, refetch } = useQuery({ queryKey: ['searchResults'], queryFn: () => searchImages(searchValue), enabled: false })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <main className='h-[calc(100vh-4rem)]'>
      {isLoading ? (
        <p>Loading...</p>
      ) : !images || images?.length === 0 ? (
        <div className="h-full flex justify-center items-center bg-[url('/hero-image.png')] bg-center bg-no-repeat bg-fixed">
          <div className='flex flex-col items-center gap-3 w-1/3'>
            <h4 className='text-4xl font-semibold'>Search</h4>
            <p className='text-xs font-light'>Search high-resolution images from Unsplash</p>
            <SearchBar value={searchValue} onSubmit={handleSearch} onChange={handleInputChange} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-[url('/gradiend-bg@2x.png')] h-24 w-full flex justify-center items-end">
           <div className='w-1/2 -mb-6'>
            <SearchBar value={searchValue} onSubmit={handleSearch} onChange={handleInputChange} />
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4 p-16'>
            {images?.map((image: any) => (
              <a key={image.id} href={`/image/${image.id}`}>
                <img src={image.urls.small} alt={image.alt_description} className='object-cover' />
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}