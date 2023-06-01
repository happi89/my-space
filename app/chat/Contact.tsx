import Image from "next/image";

interface Props {
  name: string;
  text?: string;
  date?: string;
  image?: string;
  highlighted: boolean
}

export default function Contact({ image, date, text, name, highlighted}: Props) {
  return (
    <div className={`${highlighted ? 'bg-slate-200' : 'bg-white'} entry cursor-pointer transform hover:scale-105 duration-300 transition-transform mb-4 rounded p-4 flex shadow-md`}>
      <div className="flex-2">
        <div className="w-12 h-12 relative">
          <Image width={50} height={50} className="w-12 h-12 rounded-full mx-auto" src={image!} alt="chat-user" />
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="truncate w-32"><span className="text-gray-800">{name}</span></div>
        <div><small className="text-gray-600">{text}</small></div>
      </div>
      <div className="flex-2 text-right">
        <div><small className="text-gray-500">{date}</small></div>
        {/* <div>
          <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
            23
          </small>
        </div> */}
      </div>
    </div>
  )
}