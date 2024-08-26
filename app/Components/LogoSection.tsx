import Image from 'next/image';
import React from 'react'
import logo from '@/public/Logo.png';

const LogoSection = () => {
  return (
    <div>
        <Image
        src={logo}
        alt="logo img"
        height={21}
        width={155}
        />
    </div>
  )
}

export default LogoSection;