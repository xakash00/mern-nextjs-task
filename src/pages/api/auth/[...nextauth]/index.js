import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log(credentials)
                try {
                    const res = await axios({
                        url: `/api/login`,
                        method: "POST",
                        data: {
                            email: credentials?.email,
                            password: credentials?.password,
                        },
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const user = await res.json();

                    if (user) {
                        console.log(user)
                        return user;
                    } else {
                        return "aks";
                    }
                } catch (err) {
                    console.log(err)
                }

            },
        }),
    ],

    pages: {
        signIn: "/sign-in",
    },
});