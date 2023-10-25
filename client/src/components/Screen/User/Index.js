import React from 'react'
import { MdAssignmentAdd, MdDashboard, MdForwardToInbox, MdMedicalServices } from 'react-icons/md'
import { AiOutlineUser } from 'react-icons/ai'
import { BiLogOutCircle } from 'react-icons/bi'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contextApi/auth'


const Index = () => {
  const [auth, , Logout] = useAuth();
  const navigate= useNavigate();
  const userRole = auth?.user?.isDoctor || auth?.user?.isAdmin;
  const HandleLogout=()=>{
    Logout();
    navigate('/login');
  }
  if (userRole) {
    return navigate('/');
  }
  return (
    <>
    <div className="flex">
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l ">
      <a href="#" className="mx-auto">
        <img
          className="w-auto h-6 sm:h-7"
          src="https://www.doctorapp.com.br/assets/images/logo.png"
          alt=""
        />
      </a>
      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src={auth.user.avatar}
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 font-medium text-gray-800 ">
        {auth?.user?.name}
        </h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 ">
        {auth?.user?.email}
        </p>
      </div>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link to='/user/dashboard'
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg  "
            
          >
            
          <MdDashboard className='h-5 w-5'/>
            <span className="mx-4 font-medium">Dashboard</span>
          </Link>
          <Link to='/user/profile'
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
            
          >
            <AiOutlineUser className='h-6 w-6'/>
            <span className="mx-4 font-medium">Accounts</span>
          </Link>
          
          <Link to='/user/appointments'
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
            href="#"
          >
           <MdAssignmentAdd className='h-6 w-6'/>
            <span className="mx-4 font-medium">Appointments</span>
          </Link>
          <Link to='/user/subscription'
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
            
          >
            <MdMedicalServices className='h-6 w-6'/>
            <span className="mx-4 font-medium">Subscription</span>
          </Link>
         
          <Link to='/user/chat_to_doctor'
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100  hover:text-gray-700"
            
          >
           <MdForwardToInbox className='h-6 w-6'/>
            <span className="mx-4 font-medium">Inbox</span>
            <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">5</span>
          </Link>

          

          <div className="flex items-center justify-between mt-6">
            <Link to='/user/profile' className="flex items-center gap-x-2">
              <img
                className="object-cover rounded-full h-7 w-7"
                src={auth?.user?.avatar}
                alt="avatar"
              />
              <span className="text-sm font-medium text-gray-700 ">
              @{auth?.user?.username}
              </span>
            </Link>
            <button 
            onClick={HandleLogout}
              
              className="text-gray-500 transition-colors duration-200 rotate-180  rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
            >
             <BiLogOutCircle className='h-7 w-7'/>
            </button>
          </div>
          
        </nav>
       
      </div>
      
    </aside>
    <div className="flex-1 p-3 overflow-y-auto">
    <Outlet />
  </div>
      </div>
</>

  )
}

export default Index