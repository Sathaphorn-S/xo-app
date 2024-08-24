import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className="bg-[#2e230e] text-[#ccaa66] font-bold text-2xl flex justify-center mx-auto items-center h-[2.5rem] pt-2">

      <Image
              src="/superxo.png" // Ensure this path is correct and the image is in the public directory
              width="400"
              height="50" 
              alt="header"
                  />
   
    </div>
  )
}

export default Header
