'use client'

import { useState, useEffect } from 'react';
import { signIn, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Spiner from '@components/LoadingSpiner';


const page = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState()
  const router = useRouter()



    useEffect(() => {
        const fetchProviders = async () => {
          const response = await getProviders()
    
          setProviders(response)
        }
        fetchProviders()

      }, []);

    useEffect(() => {
        // Check if the user is authenticated and redirect if necessary
        if (session) {
          router.push('/') // Replace '/' with your desired URL
        }
      }, [session]);

  return (
    <>
    <section className='w-full max-w-full flex-center flex-col p-4'>
      <div className="mt-10 w-full max-w-xl flex flex-col gap-8 glassmorphism items-center" >
        <h2 className='font-andada  text-xl sm:text-2xl font-medium sm:pt-4 text-center'>Zaloguj się lub załóż konto</h2>
      <div className='flex flex-col pb-12 pt-6 gap-5'>
    {
      providers ? 
      Object.values(providers).map((provider) => (
        <button
        type="button"
        key={provider.name}
        onClick={() => signIn(provider.id)}
        className='flex gap-3 bg-white/20 py-4 px-8 sm:px-14 rounded-lg  justify-center  border border-white/10 shadow-sm hover:ring-2 hover:ring-white/10'>
          <Image 
            src={provider.name === 'Google' ? '/assets/icons/Google__G__Logo.svg' : 'assets/icons/Octicons-mark-github.svg'}
            width={25}
            height={25}
            alt={provider.name}
           />
          <span className='font-medium'>Kontunuj z {provider.name}</span>
        </button>
      )) : <Spiner />
    }
    </div>
    </div>
    </section>
    </>
  )
}

export default page