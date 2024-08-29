"use client";

import { signIn } from "next-auth/react";
import React, { useRef } from "react";

const LoginPage = () => {
    const email = useRef("");
    const pass = useRef("");
    console.log(email)
    const onSubmit = async () => {
        const result = await signIn("credentials", {
            email: email.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/",
        });
    };
    return (
        <div
            className={
                "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
            }
        >
            <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
                <input
                    labelText="User Name"
                    onChange={(e) => (email.current = e.target.value)}
                />
                <input
                    labelText="Password"
                    type={"password"}
                    onChange={(e) => (pass.current = e.target.value)}
                />
                <button onClick={onSubmit}>Login</button>
            </div>
        </div>
    );
};

export default LoginPage;