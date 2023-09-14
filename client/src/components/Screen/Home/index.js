import React from 'react'
import { useAuth } from '../../../contextApi/auth'
import AdminHome from './AdminHome';
import UserHomepage from './User'

const Index = () => {
  const [auth] = useAuth();
  return (
    <>
    {
      auth?.user && auth?.user.isAdmin===true ? <AdminHome/> : <UserHomepage/>
    }
    </>
  )
}

export default Index