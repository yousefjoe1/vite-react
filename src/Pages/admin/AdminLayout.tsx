import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    <nav>
      Admin nav
    </nav>
    <Outlet />
        
    </>
  )
}

export default AdminLayout