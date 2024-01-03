import { Link } from 'react-router-dom'

const LinkButton = ({ label, to }) => {
  return (
    <Link to={to} className='button lg:w-96 max-w-[20rem] w-full flex-1'>
      {label}
    </Link>
  )
}

export default LinkButton