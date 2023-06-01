'use client'

import { useState } from "react"
import Modal from "@/components/Modal"
import { useRouter } from "next/navigation"
import { MultiSelect } from "react-multi-select-component"
import Contact from "./Contact"
import Link from "next/link"

export default function SideBar({ users, user, contacts, highlighed }: any) {
  const [selected, setSelected] = useState([])
  const router = useRouter()

  const options = users?.map((user: any) => {
    return {
      label: user?.name,
      value: user?.id
    }
  })

  return (
    <div className="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6 border-r-2">
      <div className="search flex pb-6 px-2 items-center justify-between">
        <h1 className="text-xl font-bold">
          {user?.name}
        </h1>
        <Modal 
        trigger={<Trigger />} 
        onAction={async () => await createChatRoom(user?.id, selected.map((u: any) => u?.value)).then((res) => {
          router.push(`/chat/${res?.id}`);
          setSelected([])
        })}
        triggerStyle="btn btn-circle btn-ghost" 
        actionStyle="btn btn-primary text-white w-full"
        action='Chat'
        heading='New Chat'
        >
          
          <div>
            <MultiSelect
              options={options} 
              value={selected} 
              onChange={setSelected}
              labelledBy='Select'
              hasSelectAll={false}
           />
          </div>

          <ul className="mt-4 ml-1">
            {selected?.map((user: any) => {
              return <li className="list-disc" key={user?.label}>{user.label}</li>
            })}
          </ul>

        </Modal>


      </div>
      <div className="flex-1 h-full overflow-auto px-2">
        {
          contacts.map((c: any) => {
            return (
              <Link key={c?.id} href={`/chat/${c?.id}`}>
                <Contact name={c?.name} highlighted={c?.id === highlighed ? true : false} />
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

const Trigger = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  )
}

const createChatRoom = async (senderId: string, receiverIds: string[]) => {
  const res = await fetch('/api/chatroom', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      senderId,
      receiverIds
    })
  })
  
  return await res?.json()
}