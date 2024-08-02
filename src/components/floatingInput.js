import React from 'react'
import styles from "../styles/makeResume.module.css"
export const FloatingInput = (props) => {
    const { id, name, register, label, onChange, error } = props;

    return (
        <div className="relative mb-[24px] w-full z-0">
            <input type="text" {...register} name={name}  {...{ id, name, onChange }} className={`peer block w-full appearance-none border-0 border-b ${error ? "border-error" : "border-primary"} bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-0`} placeholder=" " />
            <label for={name} className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${error ? "text-error" : "text-primary"} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-focus:dark:text-primary`}>{label}</label>
        </div>
    )
}

export const FloatingTextArrea = (props) => {
    const { id, name, register, label } = props
    return (
        <div className="relative z-0 w-full col-span-2">
            <textarea {...register} {...{ id, name }} rows="5" className="peer block w-full appearance-none border-0 border-b border-primary bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-0" placeholder=" "></textarea>
            <label for={name} className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-primary duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-focus:dark:text-primary">{label}</label>
        </div>
    )
}