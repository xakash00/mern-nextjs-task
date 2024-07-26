import axios from 'axios'
import React, { useEffect, useState } from 'react'

const BuildRsume = () => {
    const [details, setDetails] = useState([])

    const fetchResume = () => {
        axios.get(`/api/resume`).then((data) => {
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
    return (
        <div>
            {
                details.map((item, index) => {
                    return (
                        <div className='border-[1px] border-black p-[10px] m-auto' key={item.id}>
                            <div className=''>{JSON.stringify(item, 2, null)}</div>
                            <button onClick={() => { onDelete(item._id) }} className='bg-black p-[3px] text-white'>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BuildRsume