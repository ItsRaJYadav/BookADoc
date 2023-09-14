import React from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <RiCloseCircleLine className="text-red-500 text-6xl mb-4" />
      <h1 className="text-2xl font-semibold">Appointment Canceled!</h1>
    </div>
  )
}

export default Cancel