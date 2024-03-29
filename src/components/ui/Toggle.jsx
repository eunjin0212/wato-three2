
const Toggle = ({ value, onChange, name }) => {
  return (
    <label className='relative inline-flex cursor-pointer select-none items-center'>
      <input
        type='checkbox'
        className='hidden'
        name={name}
        checked={value}
        onChange={onChange}
      />
      <span
        className={['slider mr-3 flex h-[32px] w-[56px] items-center rounded-full p-1 duration-200 ', value ? 'bg-primary' : 'bg-[#CCCCCE]'].join(' ')}
      >
        <span
          className={['dot h-[24px] w-[24px] rounded-full bg-white duration-200', value && 'translate-x-6'].join(' ')}
        ></span>
      </span>
    </label>
  );
};

export default Toggle;
