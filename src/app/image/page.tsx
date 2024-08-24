import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div>
      <Image
          src="/background.png" // Ensure this path is correct and the image is in the public directory
          alt="Draw"
          layout="fill" // Use fill to cover the container
          objectFit="contain" // Ensure the image fits within its container
          
        />
    </div>
  )
}

export default page
