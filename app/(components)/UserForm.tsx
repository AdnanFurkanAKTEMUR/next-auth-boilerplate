"use client"
import { UserLoginInfo } from "@/types/userTypes";
import { NextApiResponse } from "next";
import { useRouter } from "next/navigation"
import React, {SyntheticEvent, useState} from "react"

const UserForm = () => {
  const router = useRouter();
  const [formData,setFormData]= useState<UserLoginInfo>(undefined);
  const [errorMessage,setErrorMessage] = useState<string>("");

  const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState)=>({
      ...prevState,
      [name]:value
    }))

  }

  const handleSubmit = async (e:SyntheticEvent)=>{
    e.preventDefault();
    setErrorMessage("");
    const res: Response = await fetch("/api/Users", {
      method:"POST",
      body:JSON.stringify(formData),
    })
    if(!res.ok){
      const response = await res.json();
      setErrorMessage(response.message);
    }
    else{
      router.refresh();
      router.push("/")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
        <h1>Create New User</h1>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} required={true} value={formData?.name} className="m-2"/>
      </form>
    </div>
  )
}

export default UserForm