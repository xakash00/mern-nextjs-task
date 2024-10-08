import axios from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const Register = () => {
    const router = useRouter()
    const { register, handleSubmit } = useForm({
        defaultValues: { email: "", password: "", confirmpassword: "" }
    })
    const onRegister = (data) => {
        axios({
            url: `/api/register`,
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((data) => {
            router.push("/login")
        }).catch(err => { })
    }
    return (
        <>
            <div className='m-auto w-full flex justify-center mt-[10%]'>
                <form onSubmit={handleSubmit(onRegister)} className='flex flex-col gap-[32px]'>
                    <div className='flex flex-col'>
                        <input {...register("email")} placeholder='Enter Email' className="p-[16px] mb-[8px] text-black rounded-[6px]" />
                        <input {...register("password")} placeholder='Enter password' className="p-[16px] mb-[8px] text-black rounded-[6px]" />
                        <input {...register("confirmpassword")} placeholder='Confirm password' className="p-[16px] mb-[8px] text-black rounded-[6px]" />
                    </div>
                    <button className="border-[1px] border-white p-[16px]" type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default Register

export function getServerSideProps(ctx) {
    const { token } = (ctx.req.cookies);
    if (token) {
        return {
            redirect: {
                destination: "/"
            }

        }

    }
    return { props: { data: null } }
}