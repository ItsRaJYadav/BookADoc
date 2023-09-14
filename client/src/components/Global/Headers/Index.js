import React from 'react';
import { useAuth } from '../../../contextApi/auth';
import UserHeader from './UserHeader';
import AdminHeader from '../Headers/AdminHeader';
import DoctorHeader from '../Headers/DoctorHeader';

const Index = () => {
  const [auth] = useAuth();

  return (
    <>
      {auth.user && auth.user.isAdmin ? (
        <AdminHeader />
      ) : auth.user && auth.user.isDoctor ? (
        <DoctorHeader />
      ) : (
        <UserHeader />
      )}
    </>
  );
};

export default Index;
