interface Props {
  triggerStyle: string;
  heading: string;
  actionStyle: string;
  action: string
  trigger: React.ReactNode;
  children: React.ReactNode;
  onAction: () => void;
}

export default function Modal({ 
    triggerStyle, 
    trigger, 
    heading, 
    children, 
    actionStyle,
    action,
    onAction,
  }: Props) {

  return (
    <>
      <label htmlFor="my-modal" className={triggerStyle}>
        {trigger}
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle"  />
      <div className="modal">
        <div className="modal-box sm:h-[400px] h-[300px] flex flex-col">
          <h3 className="font-bold text-lg">{heading}</h3>
          <div className="divider mb-6"></div>
          {children}
          <div className="modal-action flex-grow flex justify-end items-end">
            <label onClick={onAction} htmlFor="my-modal" className={actionStyle}>{action}</label>
          </div>
        </div>
      </div>
    </>
  )
}