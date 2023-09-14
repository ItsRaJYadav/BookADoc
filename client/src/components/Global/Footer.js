import React from 'react'
import footerImg from '../assets/logo.png'

const Footer = () => {
  return (
    <>
      <footer class="bg-white ">
        <div class="container flex flex-col items-center justify-between px-6 py-8 mx-auto lg:flex-row">
          <a href="#">
            <img class="w-auto h-7" src={footerImg} alt="" />
          </a>

          <div class="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0">
            <a href="#" class="text-sm text-gray-600 transition-colors duration-300  hover:text-blue-500 ">
              Overview
            </a>

            <a href="#" class="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 ">
              Features
            </a>

            <a href="#" class="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 ">
              Pricing
            </a>
            <a href="#" class="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 ">
              Careers
            </a>

            <a href="#" class="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 ">
              Help
            </a>

            <a href="#" class="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 ">
              Privacy
            </a>
          </div>

          <p class="mt-6 text-sm text-gray-900 lg:mt-0 ">© Copyright 2023 BookADoc </p>
        </div>
      </footer>
    </>
  )
}

export default Footer