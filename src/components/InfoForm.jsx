import Input from './ui/Input'
import Select from './ui/Select'

// TODO: 내정보 페이지와 유사함
const InfoForm = ({ onSubmit, validateInputs, validate, inputs }) => {
  return (
    <form onSubmit={onSubmit} className='w-96 flex flex-col gap-3'>
      {validateInputs.map(({ type, value, onChange, onClick, placeholder, name, display, buttonLabel }, idx) => (
        display && <div className='flex items-start' key={`${name}_${idx}`}>
          <Input
            type={type}
            value={value}
            className='flex-1'
            onChange={onChange}
            placeholder={placeholder}
            required
            name={name}
            validate={validate[name]}
            inputClass='h-14'
          />
          {buttonLabel && <button type='button' className='w-[7.5rem] h-14 ml-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg rounded-lg p-2.5 border' onClick={onClick}>
            {buttonLabel}
          </button>}
        </div>
      ))}
      {inputs.map(({ type, value, onChange, placeholder, name, className, options }, idx) => (
        type === 'input' ? <Input
          key={`${name}_${idx}`}
          type='text'
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          required
          inputClass={className}
        /> :
          <Select
            key={`${name}_${idx}`}
            options={options}
            value={value}
            name={name}
            placeholder={placeholder}
            required
            className={className}
            onChange={onChange}
          />
      ))}

      <button
        type='submit'
        className='w-full me-2 button'
      >
        회원가입
      </button>
    </form>
  )
}

export default InfoForm