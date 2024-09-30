'use client'
 
import { useParams } from 'next/navigation'
import { Button, CollectionCard, SearchBar } from "@/components";
import { addPhotoToCollection, getImageDetails, removePhotoFromCollection, searchCollections } from '@/services/unsplashApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function ImageDetails() {
    const [searchValue, setSearchValue] = useState('');
    const params = useParams();
    const [showModal, setShowModal] = useState(false);
    const { data, isLoading } = useQuery({ queryKey: ['imageDetails', params], queryFn: () => getImageDetails(params.slug)});
    const collections = useQuery({ queryKey: ['collectionsSearchResults'], queryFn: () => searchCollections(searchValue), enabled: false })
    collections.data && console.log(collections.data);
    data && console.log(data?.related_collections.results[0])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        collections.refetch();
      };
    if (isLoading) return <h4>Loading...</h4>
    return (
        <main className="p-16 grid grid-cols-2 gap-8 relative">
            {showModal && 
                <div onClick={() => setShowModal(false)} className='absolute -top-16 h-full w-full bg-white bg-opacity-50 flex justify-center'>
                    <div onClick={(e) => e.stopPropagation()} className='fixed top-1/4 w-1/2 rounded-xl px-8 py-14 bg-white'>
                        <div className="flex flex-col gap-4">
                            <h4>Add to Collection</h4>
                            <SearchBar value={searchValue} onSubmit={handleSearch} onChange={(e) => setSearchValue(e.target.value)} />
                            <p>{collections.data ? collections.data.total : 0} matches</p>
                            <div className='h-96 overflow-y-scroll'>
                                {collections.data?.results.map(item => 
                                    <CollectionCard key={item.id} title={item.title} totalPhotos={item.total_photos} coverPhoto={item.cover_photo} btnText='Add to Collection' onClick={() => addPhotoToCollection(item.id, data.id)} />
                                )}
                            </div>
                    </div>
                    </div>
            </div>}
            <div className='rounded-xl h-full'>
                <img src={data?.urls.regular} alt="Image" className='rounded-md' />
            </div>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-4'>
                        <img src={data?.user.profile_image.medium} alt="Profile Image" className='rounded-full h-10' />
                        <h6 className='text-sm'>{data?.user.first_name} {data?.user.last_name}</h6>
                    </div>
                    <p className='font-light text-xs'>Published on {data && new Date(data.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                    })}</p>
                    <div className='flex gap-4'>
                        <Button btnText="Add to Collection" onClick={() => setShowModal(true)} />
                        <Button btnText="Download" onClick={() => data && window.open(data.links.download, '_blank', 'noopener,noreferrer')} />
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl font-semibold'>Collections</h4>
                    {data?.related_collections.results.map(item => 
                        <CollectionCard key={item.id} title={item.title} totalPhotos={item.total_photos} coverPhoto={item.cover_photo} btnText='Remove' onClick={() => removePhotoFromCollection(item.id, data.id)} />
                    )}
                </div>
            </div>
        </main>
    )
}