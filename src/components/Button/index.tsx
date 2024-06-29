import { PropsWithChildren } from "react"
import { Props } from "./types"

const Button = ({ type, children, onClick }: PropsWithChildren<Props>) => {
  return (
    <button
      type={type || "submit"}
      className="bg-lime-900 hover:bg-lime-950 text-white font-bold py-2 px-4 rounded-lg shadow-md w-fit"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button