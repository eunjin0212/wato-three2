/**
 * Props
 * @typedef {Object} Props
 * @property {string[]} options
 * @property {string} value
 * @property {string} name
 * @property {string} placeholder
 * @property {() => void} onChange
 * @property {boolean} error
 * @property {boolean} required
 */
/**
 * @param {Props} props
 */

const Select = ({ options, placeholder, value, onChange, name, error, required }) => {
  return (
    <select
      className={['input w-full h-14', error ? '' : 'border-gray-300 dark:border-gray-600', !value && 'text-gray-400'].join(' ')}
      name={name}
      onChange={(e) => onChange(e)}
      required={required}
      value={value}
    >
      <option value=''>{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  )
}

export default Select