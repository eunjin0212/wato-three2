import { Link } from 'react-router-dom'

const LinkButton = ({ label, to }) => {
  return (
    <Link to={to} className='text-primary bg-white font-bold rounded-lg text-xl lg:w-96 w-80 px-3 py-3 mt-3 mb-2 dark:bg-blue-500 dark:text-white focus:outline-none'>
      {label}
    </Link>
  )
}

export default LinkButton