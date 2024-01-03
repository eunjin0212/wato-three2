import { useEffect, useState } from 'react';
import { api } from '@/api/axios';
import Topbar from '@/ui/Topbar';
import Toggle from '@/ui/Toggle';

function Item({ title, value, onChange }) {
  return (
    <div className='p-4 rounded-lg relative flex justify-between items-center'>
      <h2 className='text-xl font-medium'>{title}</h2>
      <div className='flex items-center'>
        <label className='flex cursor-pointer select-none items-center'>
          <Toggle value={value} onChange={onChange} />
        </label>
      </div>

      <div className='absolute bottom-0 left-0 right-0 border-b border-gray-300 mt-4'></div>
    </div>
  );
}

const Push = () => {
  const [alarm, setAlarm] = useState({
    push: false,
    announcement: false,
    comment: false,
    recommend: false
  })

  /**
  * @description 화면 잠금 설정
  */
  async function getAlarm() {
    try {
      const res = await api.get('user/notification/setting')
      Object.entries(res.data.data).forEach(([key, value]) => {
        setAlarm({ [key]: value === 'ON' })
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAlarm()
  }, [])

  /**
  * @description 화면 잠금 설정
  */
  async function handleAlarm() {
    try {
      const request = {}
      Object.entries(alarm).forEach(([key, value]) => {
        request[key] = value ? 'ON' : 'OFF'
      })

      const res = await api.put('user/notification/setting', request)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const documents = [
    {
      title: '푸시 알림받기',
      value: alarm.push,
      name: 'push',
      onChange: () => {
        setAlarm((prev) => ({ ...prev, push: !prev.push }))
        handleAlarm()
      }
    },
    {
      title: 'WATO 공지사항/새소식',
      value: alarm.announcement,
      name: 'announcement',
      onChange: () => {
        setAlarm((prev) => ({ ...prev, announcement: !prev.announcement }))
        handleAlarm()
      }
    },
    {
      title: '새 댓글',
      value: alarm.comment,
      name: 'comment',
      onChange: () => {
        setAlarm((prev) => ({ ...prev, comment: !prev.comment }))
        handleAlarm()
      }
    },
    {
      title: '새 추천',
      value: alarm.recommend,
      name: 'recommend',
      onChange: () => {
        setAlarm((prev) => ({ ...prev, recommend: !prev.recommend }))
        handleAlarm()
      }
    },
  ];

  return (
    <main className='main'>
      <section className='flex-1'>
        <Topbar title='알림 설정' />
        <div className='flex flex-col max-w-3xl mx-auto px-5 py-10 lg:px-8'>
          {documents.map((doc, index) => (
            <Item key={index} {...doc} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Push
