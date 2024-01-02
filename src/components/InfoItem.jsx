import Input from '@/ui/Input';
import Select from '@/ui/Select';

const InfoItem = ({
  title,
  value,
  onChange,
  placeholder,
  validate,
  options,
  name,
  onBlur,
  optionLabel = 'name',
  optionValue = 'id',
  type = 'input' }) => {
  return (
    <div className='px-4 w-full flex justify-start items-center border-b border-gray-300'>
      <h2 className='text-md font-regular py-4 text-gray-500 w-28 min-w-[7rem]'>{title}</h2>
      {type === 'input' ? (
          <Input
            type={type}
            value={value}
            onChange={onChange}
            onBlur={(e) => onBlur && onBlur(e)}
            placeholder={placeholder}
            required
            className='w-full'
            name={name}
            validate={validate[name]}
            inputClass='w-full border-0 bg-transparent dark:text-gray-900'
          />
      ) :
        (<Select
          options={options}
          name={name}
          placeholder={placeholder}
          className='w-full border-0 bg-transparent dark:text-gray-900'
          value={value}
          onChange={onChange}
          optionValue={optionValue}
          optionLabel={optionLabel}
        />)
      }
    </div>
  );
}

export default InfoItem