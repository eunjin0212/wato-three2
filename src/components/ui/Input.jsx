/**
 * Props
 * @typedef {Object} Props
 * @property {string} name
 * @property {string} value
 * @property {string} type
 * @property {string} placeholder
 * @property {undefined | () => void} onBlur
 * @property {() => void} onChange
 * @property {boolean} error
 * @property {boolean} required
 */
/**
 * @param {Props} props
 */
const Input = ({name, value, type, placeholder, onBlur, onChange, error, required}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      autoComplete="true"
      onBlur={onBlur ? () => onBlur() : null}
      className={['input w-96 h-14', error ? '' : 'border-gray-300 dark:border-gray-600'].join(' ')}
      placeholder={placeholder}
      required={required}
      name={name}
    />
  )
}

export default Input