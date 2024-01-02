import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useDraggable } from 'react-use-draggable-scroll';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import korea from '@/assets/korea.png';
import comment from '@/assets/ico_comment_line.png';
import bubble from '@/assets/ico_comment_gray.svg';
import banner from '@/assets/banner.png';
import bannermobile from '@/assets/bannermobile.png';
import Menu from '@/components/Menu';
import LogoTopbar from '@/components/LogoTopbar';
import FloatyIcon from '@/components/FloatyIcon';
import Chip from '@/ui/Chip';
import { api } from '@/api/axios';

export default function Index() {
  const [categories, setCategories] = useState([])
  const [post, setPost] = useState([])


  async function getPostList() {
    try {
      const res = await api.get('main/post', {
        params: {
          filter: 'top',
          page: 1,
          size: 5
        }
      })
      setPost(res.data.data.list)
    } catch (error) {
      console.error(error)
    }
  }

  async function getCategoryList() {
    try {
      const res = await api.get('main/category')
      setCategories(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (!Cookies.get('token')) {
      navigate('/')
      return;
    }

    // refreshToken()
    getPostList()
    getCategoryList()

    return () => { }
  }, []);

  return (
    <main className='flex flex-col bg-gray-100 min-h-screen'>
      <LogoTopbar />
      <section className='flex flex-col max-w-3xl mx-auto px-5 lg:px-8 pt-3 pb-16'>
        <Link to='/write'>
          <FloatyIcon />
        </Link>
        <div className='flex flex-row gap-3'>
          <Menu />
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-start gap-2'>
              {categories.map((category) => (<Chip data={category} key={category.name} />))}
            </div>
            <img
              src={window.innerWidth < 768 ? bannermobile : banner}
              alt='Home Icon'
              className='w-full h-[110px] lg:h-18 object-fill'
            />
            <div className='flex flex-col w-full'>
              {post.map((doc, index) => (
                <Card key={index} {...doc} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

const Card = ({
  title,
  content,
  id,
  countryName,
  createDate,
  categoryName,
  commentCount,
  nickname,
}) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

  return (
    <Link to={`/indexdetail/${id}`}>
      <div className={`w-full pb-4`}>
        <div className='p-4 flex flex-col rounded-lg shadow-sm bg-white justify-start space-y-4'>
          <div className='flex flex-row items-center justify-between pb-4 border-b border-gray-200'>
            <div className='flex flex-row items-center'>
              {countryName && (
                <img
                  src={korea}
                  alt='Recommend Icon'
                  className='w-6 h-6 object-cover'
                />
              )}
              <p className='text-md font-medium ml-2 text-gray-500 '>
                {countryName}
              </p>
              <p className='text-md font-medium ml-2 text-gray-500 '>
                {nickname}
              </p>
            </div>
            <span className='bg-blue-50 text-primary text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
              {categoryName}
            </span>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <h1 className='text-lg font-regular'>{title}</h1>
            <p className='text-sm font-medium ml-2 text-gray-400'>
              {formatDate(createDate)}
            </p>
          </div>
          <p className='text-md font-regular text-gray-400 pb-4 border-b border-gray-200'>
            {content}
          </p>

          <div className='flex flex-row items-center justify-between pb-4'>
            <div className='flex flex-row items-center'>
              {countryName && (
                <img
                  src={bubble}
                  alt='Recommend Icon'
                  className='w-6 h-6 object-cover'
                />
              )}
              <h1 className='text-lg font-medium text-gray-400 pl-1'>
                {commentCount}
              </h1>
            </div>
            <div className='flex flex-row items-center'>
              {countryName && (
                <img
                  src={comment}
                  alt='Recommend Icon'
                  className='w-6 h-6 object-cover'
                />
              )}
              <h1 className='text-lg font-regular text-primary'>댓글</h1>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// function Drag({ categoryData }) {
//   const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
//   const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

//   return (
//     <div
//       className='flex max-w-[340px] no-scrollbar lg:max-w-full space-x-3 overflow-x-auto'
//       {...events}
//       ref={ref}
//     >
//       {categoryData.map((category) => (<Chip data={category} key={category.name} />))}
//     </div>
//   );
// }
