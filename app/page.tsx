import Dashboard from '@/components/dashboard/Dashboard'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <Dashboard/>
      <Footer/>

    </div>
  )
}

export default page