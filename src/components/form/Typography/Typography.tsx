import React from 'react'
import { twMerge } from "tailwind-merge";

function Typography({ text, tag, className }: { text: string, tag: string, className?: string }) {
    return (
        <>
            {
                tag === 'p' ? <p className={twMerge(
                    "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400",
                    className
                )}>{text}</p> : <span className={twMerge(
                    "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400",
                    className
                )}>{text}</span>
            }
        </>
    )
}

export default Typography
