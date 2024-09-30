'use client'
import { Button } from "../Button"

type CollectionCardProps = {
    title: string,
    totalPhotos: number,
    coverPhoto: any,
    btnText: string,
    onClick: () => {}
}

export function CollectionCard({title, totalPhotos, coverPhoto, btnText, onClick}: CollectionCardProps) {
    return (
        <div className="h-18 w-full flex items-center justify-between p-2 hover:bg-light-gray-color rounded-xl group">
            <div className="flex items-center gap-4">
                <img src={coverPhoto.urls.small} alt="Thumbnail" className="h-20 w-20 p-2 rounded-xl" />
                <div className="flex flex-col gap-1">
                    <h6>{title}</h6>
                    <p className='font-light text-xs'>{totalPhotos} photos</p>
                </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100">
                <Button btnText={btnText} onClick={onClick} />
            </div>
        </div>
    )
}