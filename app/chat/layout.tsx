
export default function layout({ children }: { children: React.ReactNode}) {
  return (
    <div className='pt-1'>
      <div className="w-full h-screen">
        <div className="flex h-full">

          <div className="flex-1 bg-gray-100 w-full h-full">
            <div className="main-body container m-auto w-11/12 h-full flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}