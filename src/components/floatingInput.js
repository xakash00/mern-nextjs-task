import { WarningIcon } from 'components/ui-elements/svgs';
import React from 'react';


export const FloatingInput = (props) => {
    const { id, name, register, label, error } = props;

    return (
        <div className="relative mb-[24px] w-full z-0">
            <input type="text" {...register} {...{ id, name }} className={`peer block w-full appearance-none border-0 border-b ${error ? "border-error" : "border-primary"} bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-0`} placeholder=" " />
            <label for={name} className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${error ? "text-error" : "text-primary"} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-focus:dark:text-primary`}>{label}</label>
            {error && <div className='flex py-[10px] items-center gap-[8px]'>
                <div className='w-[20px] h-[20px]'><WarningIcon /></div>
                <div className='text-[red] text-[13px] leading-3'>{error?.message}</div>
            </div>}
        </div>
    )
}

export const FloatingSelect = (props) => {
    const { id, name, register, label, error } = props;

    return (
        <div className="relative mb-[24px] w-full z-0">
            <input type="text" {...register} {...{ id, name }} className={`peer block w-full appearance-none border-0 border-b ${error ? "border-error" : "border-primary"} bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-0`} placeholder=" " />
            <label for={name} className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${error ? "text-error" : "text-primary"} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-focus:dark:text-primary`}>{label}</label>
            {error && <div className='flex py-[10px] items-center gap-[8px]'>
                <div className='w-[20px] h-[20px]'><WarningIcon /></div>
                <div className='text-[red] text-[13px] leading-3'>{error?.message}</div>
            </div>}
        </div>
    )
}

export const FloatingTextArrea = (props) => {
    const { id, name, error, max, register, label, count } = props
    return (
        <div className="relative z-0 w-full col-span-2">
            <textarea {...register} {...{ id, name }} rows="5" className={`peer resize-none block w-full appearance-none border-0 border-b ${error ? "border-error" : "border-primary"} bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-0`} placeholder=" "></textarea>
            <label for={name} className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${error ? "text-error" : "text-primary"} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-focus:dark:text-primary`}>{label}</label>
            {error && <div className='flex py-[10px] items-center gap-[8px]'>
                <div className='w-[20px] h-[20px]'><WarningIcon /></div>
                <div className='text-[red] text-[13px] leading-3'>{error?.message}</div>
            </div>}
            {count > 0 && <div className='text-[12px] w-full text-right pt-[5px] text-pHColor font-semibold font-sans'>{count}/{max}</div>}
        </div>
    )
}