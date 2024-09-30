'use client';

import { getCollectionDetails } from "@/services/unsplashApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export default function Collection() {
    const params = useParams()
    const { data, isLoading } = useQuery({ queryKey: ['imageDetails', params], queryFn: () => getCollectionDetails(params.slug)});
    data && console.log(data)
    if (isLoading) return <h4>Loading...</h4>
    return (
        <div className="flex flex-col items-center">
            <h4 className="text-4xl font-semibold gradient-text">Collections</h4>
            <p>{0} photos</p>
            <div>
                {params.slug}
            </div>
        </div>
    )
}