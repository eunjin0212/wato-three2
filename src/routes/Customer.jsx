import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/axios';
import Topbar from '@/ui/Topbar';
import Select from '@/ui/Select';
import Input from '@/ui/Input';
import checkTypoValidation from '@/utils/checkValidation';

const emailOptions = [
  'naver.com',
  'hanmail.net',
  'hotmail.com',
  'nate.com',
  'yahoo.co.kr',
  'empas.com',
  'dreamwiz.com',
  'freechal.com',
  'lycos.co.kr',
  'korea.com',
  'gmail.com',
  'hanmir.com',
  'paran.com',
];
export default function Customer() {
  const [domain, setDomain] = useState('')
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [validate, setValidate] = useState({ msg: '', status: null })
  const navigate = useNavigate();

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @description 고객센터 문의
   */
  async function handleSubmit(event) {
    event.preventDefault()

    const formatEmail = !domain ? email : `${email}@${domain}`
    if (checkTypoValidation('email', formatEmail)) {
      setValidate({ msg: '올바른 이메일을 입력해주세요.', status: false })
      return;
    }

    const request = {
      email: formatEmail,
      title,
      content,
    }

    try {
      const res = await api.post('inquiry', request)
      
      if (!res.data.data) {
        navigate(-1);
      }

    } catch (error) {
      console.error(error)
    }
  }
  return (
    <main className='main'>
      <section className='flex-1'>
        <Topbar title='고객센터' />
        <form
          onSubmit={handleSubmit}
          className='flex flex-col max-w-3xl mx-auto px-5 py-10 lg:px-8 gap-3'
          method='POST'
        >
          <h2
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            보내는 사람 이메일
          </h2>
          <div className='flex flex-row items-center space-x-2'>
            <Input
              value={email}
              name='email'
              type='text'
              inputClass='h-14'
              className='w-3/5'
              placeholder='메일을 입력해주세요.'
              onChange={(e) => setEmail(e.target.value)}
              validate={validate}
              required
            />
            <strong className='text-lg'>@</strong>
            <Select
              options={emailOptions}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder='직접입력'
              className='w-2/5 h-14'
            />
          </div>
          <Input
            value={title}
            name='title'
            type='text'
            inputClass='h-14'
            placeholder='제목을 입력해주세요.'
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            value={content}
            name='content'
            className='input h-56'
            placeholder='문의 내용을 입력해주세요.'
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button
            type='submit'
            className='w-full text-white bg-primary hover:bg-blue-800 font-bold rounded-lg text-xl px-5 py-4 mt-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none'
          >
            문의하기
          </button>
        </form>
      </section>
    </main>
  );
}
