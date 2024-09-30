'use client'
import { Button } from "../Button";

type PageNavigatorProps = {
    page: number,
    totalPages?: number,
    changePage: (direction: 'next' | 'prev' | 'first') => any
}

export function PageNavigator({page, totalPages=1, changePage}: PageNavigatorProps) {
    return (
        <div className="flex items-center justify-center gap-6">
            {page > 1 && <div className="flex gap-4">
                <Button btnText="<<" onClick={() => changePage('first')} />
                <Button btnText="<" onClick={() => changePage('prev')} />
            </div>}
            <h6>{page}</h6>
            {page < totalPages && <div className="flex gap-4">
                <Button btnText=">" onClick={() => changePage('next')} />
                {/* <Button btnText=">>" /> */}
            </div>}
        </div>
    )
}