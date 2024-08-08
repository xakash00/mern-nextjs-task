import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import MakeResume from 'components/components/make-resume';
import styles from "../../styles/makeResume.module.css"
import { ResumeOne, ResumeThree, ResumeTwo } from 'components/components/resume-templates/resumes';
import { useRouter } from 'next/router';
const BuildResume = () => {
    const router = useRouter("")
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState([]);
    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)

    const fetchResume = () => {
        axios.get(`/api/resume`, {
            headers: {
                "Content-Type": "application/json",
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

    const uploadResume = (data) => {
        axios({
            url: `/api/resume`,
            method: "POST",
            data: data,
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

    useEffect(() => {
        axios({
            url: `/api/resume-by-id`,
            method: "GET",
            // data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookies.get("token")
            }
        }).then((data) => {
            console.log(data)
            // setFormLoading(false);
        }).catch(err => {
            console.log(err);
            // setFormLoading(false)    
        })
    })

    const _logout = () => {
        axios({
            url: `/api/logout`,
            method: "GET",
            // data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookies.get("token")
            }
        }).then((data) => {
            Cookies.remove("token")
            router.push("/login")
            // setFormLoading(false);
        }).catch(err => {
            console.log(err);
            // setFormLoading(false)    
        })
    }
    return (
        <>
            <button onClick={() => { handleOpen() }}>Upload</button>
            <button onClick={() => { _logout() }}>Logout</button>
            <Modal center={true} open={show} onClose={handleClose}>
                <div className={`relative px-[20px] h-[800px] ${styles.no_scrollbar} overflow-y-auto bg-white w-full`}>
                    <MakeResume {...{ uploadResume }} />
                </div>
            </Modal>
            <div className='flex items-center gap-[16px] md:flex-wrap sm:flex-wrap  justify-center max-w-[1280px] w-full m-auto'>
                <div className={`${styles.responsive_iframe} md:m-0 lg:m-0 sm:m-auto overflow-hidden h-[700px] border-1 border-black`}>
                    <div className='border-[1px] border-black p-[32px]'>
                        <ResumeOne />
                    </div>
                </div>
                <div className={`${styles.responsive_iframe} md:m-0 lg:m-0 sm:m-auto overflow-hidden h-[700px] border-1 border-black`}>
                    <div className='border-[1px] border-black p-[32px]'>
                        <ResumeTwo />
                    </div>
                </div>
                <div className={`${styles.responsive_iframe} md:m-0 lg:m-0 sm:m-auto overflow-hidden h-[700px] border-1 border-black`}>
                    <div className='border-[1px] border-black p-[32px]'>
                        <ResumeThree />
                    </div>
                </div>
            </div>
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
        </>
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