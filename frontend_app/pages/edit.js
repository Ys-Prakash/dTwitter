import Link from 'next/link'
import { useState } from "react"
import useRouter from 'next/router'
import { useViewerRecord } from "@self.id/react"

import React from 'react'

export default function Editprofile() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [isWaiting, setWaiting] = useState(false) 

    const record = useViewerRecord("basicProfile")

    const updateRecordContent = async (name, description) => {

        const router = useRouter

        setWaiting(true)

        await record.merge({
          name: name,
          description: description
        });

        setWaiting(false)

        router.push('/')        
    };

  return (
    <div className="w-full h-screen relative">
        <div className="absolute w-6/12 h-1/2 rounded-md top-1/4 left-1/4 shadow-2xl p-5 flex flex-col justify-center items-center">
            <div className="p-4 text-center text-2xl mb-3">
                <p>Edit your profile</p>
            </div>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-initial m-2 p-4 border" />
            <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-initial m-2 p-4 border" />
            <div className="flex justify-evenly items-center">
                <button className="m-4 rounded-full bg-orange-300 hover:bg-orange-500 p-2 disabled:opacity-50 disabled:cursor-wait" onClick={() => updateRecordContent(name, description)} disabled={isWaiting == true}>Save profile</button>   
            </div>
        </div> 
    </div>
  )
}
