import React from 'react'
import { Outlet } from 'react-router-dom'

const DashLayout = () => {
  return (
    <div>
        admin nav bar
        <Outlet/>
    </div>
  )
}

export default DashLayout