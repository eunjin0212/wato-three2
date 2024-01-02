import { Link } from 'react-router-dom'

const LinkButton = ({ label, to }) => {
  return (
    <Link to={to} className='button lg:w-96 w-80'>
      {label}
    </Link>
  )
}

export default LinkButton