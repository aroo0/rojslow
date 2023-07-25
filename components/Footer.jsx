import React from 'react'

const Footer = () => {
    const date = new Date
  return (
    <footer className='w-full flex flex-center pt-10 pb-4'>
    <p className='text-sm'>rójsłów.pl © {date.getFullYear()}</p>
  </footer>
  )
}

export default Footer