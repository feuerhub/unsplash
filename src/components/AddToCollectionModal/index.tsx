'use client'
import { useState } from "react";
import { SearchBar } from "../SearchBar";
import { CollectionCard } from "../CollectionCard";

type AddToCollectionProps = {
    collections: any,
    searchValue: string,
    onChange: () => {},
    onSubmit: () => {},
}

export function AddToCollectionModal({collections, searchValue, onChange, onSubmit}: AddToCollectionProps) {
    return (
        <div className="flex flex-col gap-4">
            <h4>Add to Collection</h4>
            <SearchBar value={searchValue} onChange={() => {}} onSubmit={() => {}} />
            <p>{3} matches</p>
            <div>
                {/* {collections?.map(item => 
                <CollectionCard view="long" title={item.id} totalPhotos={3} coverPhoto="" />
                )} */}
            </div>
        </div>
    )
}