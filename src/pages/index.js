import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [studentList, setStudentList] = useState([])
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
    axios.get("http://localhost:4000/api/hello").then((data) => {
      setStudentList(data.data)
    })
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      url: `http://localhost:4000/api/hello`,
      method: "POST",
      data: studentsData,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data) => {
      fetchStudents();
    }).catch(err => {
      console.log(err)
    })

  }
  return (
    <main
      className={`flex items-center p-24 ${inter.className}`}
    >
      <div className="m-auto flex gap-[50px]">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input className="p-[16px] mb-[8px] text-black" value={studentsData.name} placeholder="Enter name" onChange={handleChange} name="name" />
          <input className="p-[16px] mb-[8px] text-black" value={studentsData.email} placeholder="Enter email" onChange={handleChange} name="email" />
          <input className="p-[16px] mb-[8px] text-black" value={studentsData.phone} placeholder="Enter phone" onChange={handleChange} name="phone" />
          <input className="p-[16px] mb-[8px] text-black" value={studentsData.address} placeholder="Enter address" onChange={handleChange} name="address" />
          <button type="submit">Submit</button>
        </form>
        <div className="h-[70vh] overflow-auto">
          {
            studentList.map((item) => {
              return (
                <div className="p-[16px] border-[2px] border-white mb-[16px]" key={item.id}>
                  <div>name: {item.name}</div>
                  <div>email: {item.email}</div>
                  <div>phone: {item.phone}</div>
                  <div>address: {item.address}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </main>
  );
}
