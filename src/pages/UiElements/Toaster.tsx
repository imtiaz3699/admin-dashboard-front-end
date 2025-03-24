import React from 'react'
import { Tick } from '../../icons'
function Toaster({message,error}:{message:string,error?:boolean}) {
    return (
        <div className="h-[50px] absolute z-[99999] top-0 flex items-center justify-center w-full animate-fadeInDown">
            <div className="bg-white  px-5 py-2 mt-5 rounded-[5px] shadow-lg flex items-center">
                <Tick className={`text-[25px] ${error ? "text-red-500" : "text-green-500"} `} />
                {message}
            </div>
        </div>
    )
}

export default Toaster
