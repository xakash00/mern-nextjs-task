import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [studentList, setStudentList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formLoading, setFormLoading] = useState()
  const [studentsData, setStudentsData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target
    setStudentsData(p => {
      return {
        ...p,
        [name]: value
      }
    })
  }

  const fetchStudents = () => {
    setLoading(true)
    axios.get("/api/hello").then((data) => {
      setLoading(false)
      setStudentList(data.data);
      setStudentsData({
        name: "",
        email: "",
        phone: "",
        address: "",
      })
    })
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true)
    axios({
      url: `/api/hello`,
      method: "POST",
      data: studentsData,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data) => {
      fetchStudents();
      setFormLoading(false);
    }).catch(err => {
      console.log(err);
      setFormLoading(false)
    })

  }


  const onDelete = (id) => {
    axios({
      url: `/api/hello`,
      method: "DELETE",
      data: id,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data) => {
      fetchStudents();
      setFormLoading(false);
    }).catch(err => {
      console.log(err);
      setFormLoading(false)
    })
  }

  const onUpdate = (e) => {
    e.preventDefault();
    setFormLoading(true)
    axios({
      url: `/api/hello`,
      method: "PUT",
      data: studentsData,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data) => {
      fetchStudents();
      setFormLoading(false);
      setIsUpdate(false)
    }).catch(err => {
      console.log(err);
      setFormLoading(false)
    })
  }

  return (
    <main
      className={`flex items-center p-24 ${inter.className}`}
    >
      <div className="m-auto flex gap-[50px]">
        <form onSubmit={isUpdate === true ? onUpdate : handleSubmit} className="flex flex-col">
          <input className="p-[16px] mb-[8px] text-black rounded-[6px]" value={studentsData.name} placeholder="Enter name" onChange={handleChange} name="name" />
          <input className="p-[16px] mb-[8px] text-black rounded-[6px]" value={studentsData.email} placeholder="Enter email" onChange={handleChange} name="email" />
          <input className="p-[16px] mb-[8px] text-black rounded-[6px]" value={studentsData.phone} placeholder="Enter phone" onChange={handleChange} name="phone" />
          <input className="p-[16px] mb-[8px] text-black rounded-[6px]" value={studentsData.address} placeholder="Enter address" onChange={handleChange} name="address" />
          {
            isUpdate === true ?
              <button disabled={formLoading} className="border-[1px] border-white p-[16px]" type="submit">{formLoading ? "Loading..." : "Update"}</button>
              : <button disabled={formLoading} className="border-[1px] border-white p-[16px]" type="submit">{formLoading ? "Loading..." : "Submit"}</button>

          }
        </form>
        <div className="max-h-[70vh]  border-[2px] w-[400px] relative rounded-[6px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-auto">
          {
            loading === true ? <div className="w-[100%] text-center absolute top-[40%] text-[20px]">Loading...</div>
              : studentList.length > 0 ? studentList.map((item) => {
                return (
                  <div className="p-[16px] relative border-b-[1px] border-white" key={item._id}>
                    <div>name: {item.name}</div>
                    <div>email: {item.email}</div>
                    <div>phone: {item.phone}</div>
                    <div>address: {item.address}</div>
                    <button onClick={() => { onDelete(item._id) }} className="bg-white text-black p-[6px] rounded-[5px text-[14px] top-[16px] right-[16px]  absolute">DELETE</button>
                    <button onClick={() => {
                      setIsUpdate(true);
                      setStudentsData({
                        id: item._id,
                        name: item.name,
                        email: item.email,
                        phone: item.phone,
                        address: item.address
                      })

                    }} className="bg-white text-black p-[6px] rounded-[5px text-[14px] mt-[16px] w-full">UPDATE</button>
                  </div>
                )
              }) : <div className="w-[100%] text-center absolute top-[40%] text-[20px]">No Data</div>
          }
        </div>
      </div>
    </main >
  );
}


