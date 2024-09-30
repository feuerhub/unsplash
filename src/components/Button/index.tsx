'use client'
type ButtonProps = {
    btnText: string,
    onClick?: () => any
}

export function Button({ btnText, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className="bg-light-gray-color text-sm py-2 px-4 rounded">{btnText}</button>
    )
}