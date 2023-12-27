import { Link } from 'react-router-dom'

const SnsButton = ({ label, src, className }) => {
  return (
    <Link to="/index">
      <button className={['flex items-center text-white font-bold rounded-lg text-lg lg:w-96 w-80 px-3 py-3 me-2 mt-3 mb-2 dark:bg-blue-600 focus:outline-none', className ].join(' ')}>
        <div className="w-32">
          <img src={src} alt="Home Icon" className="w-8 ml-2" />
        </div>
        {label}
      </button>
    </Link>
  )
}
export default SnsButton
