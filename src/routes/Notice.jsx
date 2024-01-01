import { useState, useEffect } from "react";
import { api } from '@/api/axios';
import Topbar from "@/ui/Topbar";
import Dropdown from "@/ui/Dropdown";

const Notice = () => {
  const [documents, setDocuments] = useState([])

  async function getNotice() {
    try {
      const res = await api.get('announcement')

      if (res.data.data) {
        setDocuments(res.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    getNotice()
  }, [])

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      <div className="flex-1">
        <Topbar title='공지사항' />
        <div className="flex flex-col max-w-3xl mx-auto px-5 py-10 lg:px-8">
          {
            documents.length ? documents.map((doc, index) => (
              <Dropdown key={index} {...doc} />
            )) : '공지사항이 없습니다.'
          }
        </div>
      </div>
    </div>
  );
}

export default Notice
