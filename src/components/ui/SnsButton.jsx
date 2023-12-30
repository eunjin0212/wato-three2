
const SnsButton = ({ label, src, className, onClick }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={['relative cursor-pointer flex items-center justify-center text-center font-bold rounded-lg text-lg w-full px-3 py-3 h-14 focus:outline-none', className].join(' ')}
    >
      <img src={src} alt={label} className='w-8 absolute left-3' />
      {label}
    </button>
  )
}
export default SnsButton
