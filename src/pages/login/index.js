import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
    const router = useRouter()
    const { register, handleSubmit } = useForm({
        defaultValues: { email: "", password: "" }
    })
    const onRegister = (data) => {
        axios({
            url: `/api/login`,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((data) => {
            if (typeof window !== "undefined") {
                const { accessToken } = data.data.data
                localStorage.setItem("accessToken", accessToken)
            }
            router.push("/build-resume")

        }).catch(err => { })
    }
    return (
        <div className='m-auto w-full flex justify-center mt-[10%]'>
            <form onSubmit={handleSubmit(onRegister)} className='flex flex-col gap-[32px]'>
                <div className='flex flex-col'>
                    <input {...register("email")} placeholder='Enter Email' className="p-[16px] mb-[8px] text-black rounded-[6px]" />
                    <input {...register("password")} placeholder='Enter password' className="p-[16px] mb-[8px] text-black rounded-[6px]" />
                </div>
                <button className="border-[1px] border-white p-[16px]" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login