import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Logo = () => {
   return (
      <Link href="/" className="flex items-center">
         <Image
            className="h-14 w-14 rounded-full object-cover"
            src="/makayla-logo.jpg"
            alt="Makayla Guest House Logo"
            width={80}
            height={80}
         />
      </Link>
   )
}
