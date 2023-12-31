import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import mouth from '@/assets/cate01.png';
import { api, needHeaderApi } from '@/api/axios';
import Topbar from '@/ui/Topbar';
import Select from '@/ui/Select';
import Input from '@/ui/Input';

export default function Write() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);

  /**
 * @description 게시판 국가
 */
  async function getContries() {
    try {
      const res = await api.get('country')

      setCountries(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @description 게시판 카테고리
   */
  async function getCategories() {
    try {
      const res = await api.get('main/category')

      setCategories(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getContries()
    getCategories();
    return () => { };
  }, []);

  /**
   * @param {SubmitEvent} event
   * @description 게시판 글쓰기
   */
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const requestData = {
        title,
        content,
        country: selectedCountry,
        category: selectedCategory,
      };

      const formData = new FormData()
      // formData.append('file', mouth)
      const blob = new Blob([JSON.stringify(requestData)], { type: 'application/json' })
      formData.append('request', blob);
      const res = await needHeaderApi({ 'Content-Type': 'multipart/form-data' }).post('post', formData)

      if (!res.data.data) {
        throw new Error()
      }

      navigate(-1);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col lg:flex-row bg-gray-100 min-h-screen'>
      <div className='flex-1'>
        <Topbar title='글쓰기' />
        <form
          method='POST'
          onSubmit={handleSubmit}
          className='flex flex-col gap-3 max-w-3xl px-5 mx-auto py-10 lg:px-8'
        >
          <div>
            <span
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              국가 선택
            </span>
            <Select
              options={countries}
              name='country'
              placeholder='국가를 선택해주세요.'
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              optionValue='id'
              optionLabel='name'
            />
          </div>
          <div>
            <span
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              카테고리 선택
            </span>
            <Select
              options={categories}
              name='category'
              placeholder='카테고리를 선택해주세요.'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              optionValue='id'
              optionLabel='name'
            />
          </div>

          {/* Title Input */}
          <Input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력해주세요.'
            name='title'
            required
            inputClass='h-14'
          />

          {/* Content Input */}
          <textarea
            className='h-56 input'
            placeholder='내용을 입력해주세요.'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            name='content'
          ></textarea>
          <button
            type='submit'
            className='w-full text-white bg-primary hover:bg-blue-800 font-bold rounded-lg text-xl px-5 py-4 me-2 mt-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none'
          >
            글쓰기
          </button>
        </form>
      </div>
    </div>
  );
}
