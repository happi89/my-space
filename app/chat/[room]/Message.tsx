import Image from "next/image";

interface Props {
  isUser: boolean;
  text: string;
  date?: string;
  image?: string;
}

export default function Message({ isUser, text, date, image }: Props) {
  return (
    <div className={`message mb-2 flex ${isUser && 'text-right'}`}>
      {/* {!isUser && <div className="flex-2">
        <div className="w-12 h-12 relative">
          <Image className="w-12 h-12 rounded-full mx-auto" src={image} alt="chat-user" />
        </div>
      </div>} */}
      <div className="flex-1 px-2">
        <div className={`inline-block ${isUser ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"} rounded-full p-2 px-6 tex`}>
          <span>{text}</span>
        </div>
        <div className="pl-4"><small className="text-gray-500">{date}</small></div>
      </div>
    </div>
  )
}