import { Link } from 'react-router-dom'

const MenuItem = ({ label, src, href }) => {
  return (
    <Link href={href} className="flex gap-x-2">
      <img src={src} />
      {label}
    </Link>
  )
}

export default MenuItem