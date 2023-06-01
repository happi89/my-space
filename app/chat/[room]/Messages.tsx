'use client'

import { useState, useRef, useEffect } from 'react'
import PusherClient from 'pusher-js'
import Message from "./Message"
import { User } from '@prisma/client'
import type { Message as MessageT  } from '@prisma/client'

interface MessageType extends MessageT {
  name?: string;
}


export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: 'us2'
  }
)

export default function Messages({ roomId, user, prevMessages }: { roomId: string, user: User, prevMessages: MessageType[] }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageType[]>(prevMessages)
  const [disabled, setDisabled] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null);

  console.log(messages, 'MESSAGES IN MEESSAGES COMPONENT')

  useEffect(() => {
    const channel = pusherClient.subscribe(roomId)

    const handleNewMessage = (data: MessageType) => {
      setMessages(prev => [...prev, data])
    }

    channel.bind('message', handleNewMessage)

    scrollToBottom()

    return () => {
      channel.unbind('message', handleNewMessage)
      pusherClient.unsubscribe(roomId)
    }
  }, [])

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async () => {
    setDisabled(true)
    if (!message) {
      return setDisabled(false)
    }

    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user?.name,
        content: message,
        chatRoomId: roomId,
        senderId: user?.id
      })
    })

    setMessage('')
    setDisabled(false)
  }

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="chat-area flex-1 flex flex-col">
      <div className="flex-3">
        <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">Chatting with <b>{ } user</b></h2>
      </div>
      <div className="messages flex-1 overflow-auto max-h-[65vh]" ref={chatContainerRef}>
        {messages?.map((m, i) => {
          return <li key={i} className='list-none'>
            <Message text={m.content} isUser={user?.name === m.name || user?.id === m?.senderId} />
          </li>;
        })}
      </div>


      <div className="flex-2 pt-4 sm:pb-24 pb-12">
        <div className="write bg-white shadow flex rounded-lg">
          <div className="flex-1">
            <textarea 
            onChange={handleInputChange}
            value={message}
            onKeyDown={handleKeyDown} 
            name="message"
            className="w-full block outline-none py-4 px-4 bg-transparent" 
            rows={1} 
            placeholder="Message..."
            autoFocus
            >
            </textarea>
          </div>
          <div className="flex-2 w-fit p-2 flex content-center items-center">
            <div className="flex-1">
              <button onKeyDown={(event) => {
                if(event.key === 'Enter') {
                  onSubmit()
                }
              }} onClick={onSubmit} className="bg-blue-600 w-10 h-10 rounded-full flex justify-center items-center" disabled={disabled}>
                <span className="inline-block align-text-bottom">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>

                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>)
}
