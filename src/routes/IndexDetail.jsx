import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { api } from '@/api/axios';
import Cookies from 'js-cookie';
import backicon from '@/assets/back.png';
import bubble from '@/assets/ico_comment_gray.svg';
import trash from '@/assets/trash-2.svg';
import edit from '@/assets/edit.svg';
import formatDate from '@/utils/formatDate';
import LogoTopbar from '@/components/LogoTopbar';
import Chip from '@/components/ui/Chip';
import Input from '@/ui/Input';
import checkCountryImg from '@/utils/checkCountryImg';

export default function Terms() {
  const { id } = useParams();

  const [isMobile, setIsMobile] = useState(false);

  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [isEditable, setIsEditable] = useState({});

  async function getPostDetail() {
    // 게시글 fetch
    try {
      const res = await api.get(`post/${id}`, {
        content: comment,
      })
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getComment() {
    // 댓글 fetch
    try {
      const res = await api.get(`post/${id}/comment`, {
        content: comment,
      })
      setCommentData(res.data.data.list);
    } catch (error) {
      console.error(error);
    }
  }

  function init() {
    getComment();
    getPostDetail();
  }

  async function onCreateComment(event) {
    // 댓글 작성
    event.preventDefault();
    try {
      const res = await api.post(`post/${id}/comment`, {
        content: comment,
      })

      if (res.data.data) {
        init();
      }

      setComment('')
    } catch (error) {
      console.error(error);

    }
  }

  async function onDeleteComment(commentId) {
    // 댓글 삭제
    try {
      const res = await api.delete(`post/${id}/comment`, {
        data: {
          commentId: commentId,
        }
      })

      if (res.data.data) {
        init();
      }

    } catch (error) {
      console.error(error);
    }
  }

  async function onEditComment(commentId) {
    // 댓글 수정
    if (!isEditable[commentId]) {
      setIsEditable({ [commentId]: true })
      return
    }

    try {
      const res = await api.put(`${id}/comment/${commentId}`, {
        content: editComment
      })

      if (res.data.data) {
        init();
        setEditComment('')
        setIsEditable({ [commentId]: false })
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    init();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set your breakpoint as needed
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check for mobile view on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className='flex flex-col bg-gray-100'>
      <div className='flex-1'>
        {!isMobile && <LogoTopbar />}
        <Topbar
          alignLeft
          formatDate={formatDate}
          data={data}
          id={id}
        />
        <div className='max-w-5xl mx-auto py-10 flex'>
          <div className='flex-1 mx-5 lg:mx-8'>
            <div className='space-y-10'>
              {/* <img src={detail} alt='Home Icon' className='mt-4 mb-4' /> */}
              <div
                className='text-sm lg:text-md font-regular whitespace-pre-line px-2'
                dangerouslySetInnerHTML={{ __html: data?.content }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex-1 bg-white'>
        <div className='max-w-5xl mx-auto py-4 flex'>
          <div className='flex-1 mx-5 lg:mx-8'>
            <div className='flex flex-row items-center mb-8'>
              <img
                src={bubble}
                alt='Recommend Icon'
                className='w-6 h-6 object-cover'
              />

              <h1 className='text-sm lg:text-md font-medium text-gray-400 pl-1'>
                댓글 {data?.commentCount}
              </h1>
            </div>

            {commentData.map((item) => {
              return (
                <div key={item.id}>
                  <div className='flex p-4 bg-gray-100 rounded-lg mb-2 flex-row justify-between'>
                    {!isEditable[item.id] ? <div>
                      <p className='text-sm lg:text-md font-regular whitespace-pre-line'>
                        {item?.nickname}
                      </p>
                      <p className='text-sm lg:text-md font-regular whitespace-pre-line'>
                        {item?.content}
                      </p>
                      <p className='text-sm text-gray-600'>
                        {formatDate(data?.createDate)}
                      </p>
                    </div>
                      :
                      <Input
                        type='text'
                        value={editComment}
                        className='flex-1'
                        onChange={(e) => setEditComment(e.target.value)}
                        placeholder='댓글을 입력해주세요.'
                        inputClass='h-14 bg-transparent dark:text-gray-900 text-sm'
                        required
                        name={name}
                        onKeyDown={(e) => {
                          e.keyCode === 13 && onEditComment(item.id)
                        }}
                      />
                    }
                    {
                      +Cookies.get('userId') === +item.userId && <div className='flex gap-3 ml-4'>
                        <img
                          src={edit}
                          alt='Alert Icon'
                          className='w-5 cursor-pointer'
                          onClick={() => {
                            setEditComment(item.content)
                            onEditComment(item.id)
                          }}
                        />
                        <img
                          src={trash}
                          alt='Alert Icon'
                          className='w-5 cursor-pointer'
                          onClick={() => onDeleteComment(item.id)}
                        />
                      </div>
                    }
                  </div>
                </div>
              );
            })}

            <form onSubmit={onCreateComment}>
              <input
                value={comment} // Bind value to the state
                onChange={handleCommentChange}
                type='text'
                id='first_name'
                className='mb-2 mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  h-14'
                placeholder='댓글을 입력하세요'
                required
              />

              <button
                type='submit'
                className='w-full text-white bg-primary hover:bg-blue-800 font-bold rounded-lg text-sm px-5 py-4 me-2 mt-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none'
              >
                댓글 쓰기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Topbar({ alignLeft, formatDate, data, id }) {
  const navigate = useNavigate();

  async function onDeletePost(postId) {
    // 게시글 삭제
    try {
      const res = await api.delete('post', {
        data: {
          postId: postId,
        },
      })

      if (res.data.data) {
        navigateBack();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className='bg-white shadow pr-2'>
      <div
        className={`max-w-5xl mx-auto relative py-4 px-0 flex lg:flex-row flex-col items-center justify-between gap-3 lg:px-4`}
      >
        <div className='w-1/2'>
          <img
            src={backicon}
            alt='Dropdown Icon'
            className='dropdown-icon absolute left-6 cursor-pointer lg:left-10'
            onClick={navigateBack}
          />
          <h1
            className={['text-md font-semibold ml-[60px] lg:text-lg lg:ml-[80px] lg:whitespace-nowrap', alignLeft ? 'text-left ml-20' : ''].join(' ')}
          >
            {data?.title}
          </h1>
        </div>

        <div className='flex lg:justify-end justify-between w-full lg:w-1/2 items-center gap-3 px-2'>
          <p className='text-sm lg:text-md font-semibold w-1/3 lg:w-fit flex flex-nowrap lg:flex-row flex-col lg:items-center items-start gap-3'>
            <img src={checkCountryImg(data?.countryName)} alt='profileImageUrl' className='w-6 h-6 rounded-full' />
            <span className='whitespace-nowrap block'>
              {data?.nickname}
            </span>
          </p>
          <p className='flex flex-col w-2/3 lg:w-fit gap-3 items-end lg:flex-row lg:items-center lg:justify-end'>
            <span className='text-xs w-fit whitespace-nowrap block text-gray-600 text-center lg:w-28 lg:text-sm'>
              {formatDate(data?.createDate)}
            </span>
            <Chip data={data} dataLabel='categoryName' />
          </p>
          {
            +Cookies.get('userId') === +data.userId &&
            <>
              <Link to={`/write/${id}`} className='min-w-[1.25rem] h-5 block'>
                <img
                  src={edit}
                  alt='Alert Icon'
                  className='w-5 cursor-pointer'
                />
              </Link>
              <img
                src={trash}
                alt='Alert Icon'
                className='w-5 cursor-pointer'
                onClick={() => onDeletePost(id)}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}