import { useState } from "react"

type LabelProps = {
  text: string
}

const Label: React.FC<LabelProps> = ({ text }) => {
  const [color] = useState(() => {
    const colors = ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-red-200", "bg-purple-200"]
    return colors[Math.floor(Math.random() * colors.length)]
  })

  return <span className={`${color} text-xs px-2 py-1 rounded-full`}>{text}</span>
}

export default Label

