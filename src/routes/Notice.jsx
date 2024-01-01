import { useState, useEffect } from "react";

import Menu from "@/components/Menu";
import Topbar from "@/ui/Topbar";
import Dropdown from "@/ui/Dropdown";
import { api } from '@/api/axios';

const Notice = () => {
  const [documents, setDocuments] = useState([])

  async function getNotice() {
    try {
      const res = await api.get('announcement')
      setDocuments(res.data.data)
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
        <Topbar title={"공지사항"} />
        <div className="max-w-3xl mx-auto py-10 flex">
          <Menu />
          <div className="flex-1 ml-5 mr-5 lg:ml-8 lg:mr-8">
            {
              documents.length ? documents.map((doc, index) => (
                <Dropdown key={index} {...doc} />
              )) : '공지사항이 없습니다.'
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notice
