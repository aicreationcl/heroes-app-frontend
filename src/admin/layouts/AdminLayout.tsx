import { Outlet } from 'react-router'

export const AdminLayout = () => {
  return (
    <div className='bg--500'>
        <Outlet></Outlet>
    </div>
  )
}

// export default HeroesLayout