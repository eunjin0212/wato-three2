import { useEffect, useState } from 'react'

/**
 * Props
 * @typedef {Object} Props
 * @property {string} name
 * @property {string} value
 * @property {string} type
 * @property {string} placeholder
 * @property {undefined | () => void} onBlur
 * @property {() => void} onChange
 * @property {{ msg: string; status: boolean | null } | undefined} validate
 * @property {boolean} required
 */

/**
 * @param {Props} props
 */
const Input = ({ name, value, type, placeholder, onBlur, onChange, validate, required, className }) => {
  const [validation, setValidation] = useState(validate)

  useEffect(() => {
    setValidation(validate)
  }, [validate])

  return (
    <div className={['flex flex-col items-start', className].join(' ')}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        autoComplete="true"
        onBlur={onBlur ? () => onBlur() : null}
        className={['input w-full h-14', validation?.status === false ? 'border-red-600' : validation?.status ? 'border-green-600' : 'border-gray-300 dark:border-gray-600'].join(' ')}
        placeholder={placeholder}
        required={required}
        name={name}
      />
      {validation?.status !== null && <span className={['mt-2', !validation?.status ? 'text-red-600' : 'text-green-600'].join(' ')}>{validation?.msg}</span>}
    </div>
  )
}

export default Input