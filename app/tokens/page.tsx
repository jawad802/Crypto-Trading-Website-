import React from 'react'
import TokenTable from "@/components/tokens/TokenTable";
import Navbar from '@/components/layout/Navbar'

const page = () => {
  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-[#0B0E11] py-8">
        <TokenTable/>
      </div>
    </div>
  )
}

export default page