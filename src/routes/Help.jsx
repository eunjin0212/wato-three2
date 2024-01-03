import Menu from "@/components/Menu";
import Topbar from "@/ui/Topbar";
import Dropdown from "@/ui/Dropdown";
import { api } from '@/api/axios';
import { useEffect, useState } from 'react';

const Help = () => {
  const [documents, setDocuments] = useState([])

  async function getHelp() {
    try {
      const res = await api.get('faq')

      if (res.data.data) {
        setDocuments(res.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getHelp()
  }, [])
  return (
    <div className="main">
      <div className="flex-1">
        <Topbar title='도움말' />
        <div className="max-w-3xl mx-auto py-10 flex">
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8">
            {
              documents.length ? documents.map((doc, index) => (
                <Dropdown key={index} {...doc} />
              )) : '도움말이 없습니다.'
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help