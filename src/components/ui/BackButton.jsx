import { useNavigate } from 'react-router';
import backicon from "@/assets/back.png";

/**
 * 
 * @param {string | number} link 
 * @returns {React.JSX.Element}
 */
const BackButton = ({link = -1}) => {
  const navigate = useNavigate()
  console.log(link)

  return (
    <img
      src={backicon}
      alt='back Icon'
      className='absolute left-5 top-5 cursor-pointer'
      onClick={() => navigate(link)}
    />
  )
}

export default BackButton