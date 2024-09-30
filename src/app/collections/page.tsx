'use client';

import { useQuery } from "@tanstack/react-query";
import { PageNavigator } from "@/components";
import { getCollections } from "@/services/unsplashApi";
import {useSearchParams } from "next/navigation";
import { useRouter } from 'next/router';

export default function Collections() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1';
    const { data } = useQuery({ queryKey: ['collections'], queryFn: () => getCollections({page: Number(page), perPage: 12}) })
    return (
        <main className="p-12 flex items-center flex-col justify-center gap-6">
            <div className="w-1/3 flex flex-col items-center justify-center text-center">
                <h4 className="text-4xl font-semibold gradient-text">Collections</h4>
                <p>Explore the world trough collections of beautiful photos free to use under Unsplash License.</p>
            </div>
            <div className="grid grid-cols-4 gap-6">
                {data?.map(item => 
                <a key={item.id} href={'/collections/' + item.id}>
                    <div className="flex flex-col gap-4">
                    {item.total_photos > 2 ? 
                        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-64">
                            <div className="flex items-center justify-center bg-gray-200 row-span-2 col-span-3">
                                <img src={item.preview_photos[0].urls.small} alt="Image 1" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex items-center justify-center bg-gray-200">
                                <img src={item.preview_photos[1].urls.small} alt="Image 2" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex items-center justify-center bg-gray-200">
                                <img src={item.preview_photos[2].urls.small} alt="Image 3" className="object-cover w-full h-full" />
                            </div>
                        </div> : item.total_photos === 2 ? <div className="grid grid-cols-2 gap-2 h-64">
                            <div className="flex items-center justify-center bg-gray-200">
                                <img src={item.preview_photos[0].urls.small} alt="Image 1" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex items-center justify-center bg-gray-200">
                                <img src={item.preview_photos[1].urls.small} alt="Image 2" className="object-cover w-full h-full" />
                            </div>
                        </div> : <div className="h-64">
                            <div className="flex items-center justify-center bg-gray-200">
                                <img src={item.preview_photos[0].urls.small} alt="Image 1" className="object-cover w-full h-full" />
                            </div>
                        </div>
                    }
                    <div className="flex flex-col gap-1">
                        <h6>{item.title}</h6>
                        <p className='font-light text-xs'>{item.total_photos} photos</p>
                    </div>
                    </div>
                </a>
                )}
            </div>
            {/* <PageNavigator page={Number(page)} changePage={} totalPages={10} /> */}
        </main>
    );
  }