const Chip = ({ data, dataLabel = 'name' }) => {
  return (
    data?.[dataLabel] && <span className='bg-blue-100 text-primary text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 flex-none'>
      {data[dataLabel]}
    </span>
  )
}

export default Chip