import React from 'react'

const Spiner = () => {
  return (
    <div role="status" className='py-7 flex flex-center'>
    <div
  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white/30 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] "
  />
    <span className="sr-only text-center text-xl">Ładowanie...</span>
</div>
  )
}

export default Spiner