import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="flex justify-center items-center bg-[#2e230e] h-[60px] pb-1">

      <Image
              src="/goldsauce.png" // Ensure this path is correct and the image is in the public directory
              width="400"
              height="50" 
              alt="goldsaucer"
                  />
   
    </div>
  );
}

export default Footer;
