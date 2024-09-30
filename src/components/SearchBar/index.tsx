'use client'
import Image from 'next/image';
import SearchIcon from '../../assets/images/Search.svg';

type SearchBarProps = {
    value: string;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({value, onSubmit, onChange}: SearchBarProps) {
    return (
        <form action="" className='w-full' onSubmit={onSubmit}>
             <div className="flex items-center border border-light-gray-color bg-white py-2 px-4 rounded-lg h-12">
                <input type="text" value={value} onChange={onChange} placeholder="Enter your keywords..." className='w-full font-light' />
                <button type="submit">
                    <Image src={SearchIcon} alt='Search Icon' />
                </button>
            </div>
        </form>
    )
}