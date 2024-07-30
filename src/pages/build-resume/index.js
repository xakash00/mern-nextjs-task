import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import { isJWT } from 'validator';
import { redirect } from 'next/dist/server/api-utils';

const BuildResume = () => {
    const [details, setDetails] = useState([])
    const fetchResume = () => {
        axios.get(`/api/resume`, {
            headers: {
                "Authorization": Cookies.get("token")
            }
        }).then((data) => {
            setDetails(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchResume()
    }, [])

    const onDelete = (id) => {
        axios({
            url: `/api/resume`,
            method: "DELETE",
            data: id,
            headers: {
                "Content-Type": "application/json"
            }
        }).then((data) => {
            fetchResume();
            // setFormLoading(false);
        }).catch(err => {
            console.log(err);
            // setFormLoading(false)
        })

    }

    const uploadResume = () => {
        axios({
            url: `/api/resume`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookies.get("token")
            }
        }).then((data) => {
            fetchResume();
            // setFormLoading(false);
        }).catch(err => {
            console.log(err);
            // setFormLoading(false)
        })
    }
    return (
        <div>

            <button onClick={() => { uploadResume() }}>Upload</button>
            {
                details.map((item, index) => {
                    return (
                        <div className='border-[1px] border-black p-[10px] m-auto' key={item.id}>
                            <div className=''><pre><code>{JSON.stringify(item, null, 1)}</code></pre></div>
                            <button onClick={() => { onDelete(item._id) }} className='bg-black p-[3px] text-white'>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BuildResume


export function getServerSideProps(ctx) {
    const { token } = (ctx.req.cookies);
    if (!token) {
        return {
            redirect: {
                destination: "/login"
            }

        }

    }
    return { props: { data: null } }
}