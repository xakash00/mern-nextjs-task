import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import MakeResume from 'components/components/make-resume';

const BuildResume = () => {
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState([]);

    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)

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
    return (
        <>
            <button onClick={() => { handleOpen() }}>Upload</button>
            <Modal open={show} onClose={handleClose}>
                <div className='relative p-[16px] bg-white  w-full'>
                    <MakeResume {...{ uploadResume }} />
                </div>
            </Modal>

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