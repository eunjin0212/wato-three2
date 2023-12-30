/**
 * Props
 * @typedef {Object} Props
 * @property {string[] | object[]} options
 * @property {string} value
 * @property {string} name
 * @property {string} placeholder
 * @property {() => void} onChange
 * @property {boolean} error
 * @property {boolean} required
 * @property {string} optionValue
 * @property {string} optionLabel
 * @property {string} className
 */
/**
 * @param {Props} props
 */

const Select = ({ options, placeholder, value, onChange, name, error, required, optionValue, optionLabel, className }) => {
  return (
    <select
      className={['input w-full truncate', error ? '' : 'border-gray-300 dark:border-gray-600', !value && 'text-gray-400', className].join(' ')}
      name={name}
      onChange={(e) => onChange(e)}
      required={required}
      value={value?.[optionValue] || value}
    >
      <option value=''>{placeholder}</option>
      {options && options.map((option) => (
        <option key={option?.[optionValue] || option} value={option?.[optionValue] || option}>{option?.[optionLabel] || option}</option>
      ))}
    </select>
  )
}

export default Select