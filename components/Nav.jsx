'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Avatar from '@components/Avatar'

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)


  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }
    fetchProviders()
  })



  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href='/' className='text-black/80 font-andada  sm:text-xl text-lg font-bold tracking-widest border-b-[3px] border-black/80 pb-2'>
            rójsłów.pl
        </Link>

        {/* Desktop Navigation */}

        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-4 md:gap-8 items-center">
              <Link href='/create-post' className="light_btn"> 
              Stwórz rzeczownik</Link>
            <button type="button" onClick={signOut} className='font-light hover: transition-all'>Wyloguj</button>

            <Link href='/profile'>
            <Avatar id={session?.user.id}/> 
            </Link>
            </div>
          ) : (
            <>
            {
              providers && 
              Object.values(providers).map((provider) => (
                <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='light_btn'>
                  Zaloguj
                </button>
              ))
            }
            </>
          )}
        </div>
        <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className="flex">
              <div onClick={() => setToggleDropdown((prev) => !prev)}>
            <Avatar id={session?.user.id}
              ></Avatar>
              </div>

              {toggleDropdown && (
                <div className='dropdown z-10'>
                  <Link
                    href='/profile'
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                    >
                    Profil
                    </Link>
                    <Link
                    href='/create-post'
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                    >
                    Stwórz rzeczownik
                    </Link>
                    <button 
                      type="button"
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut()
                      }} 
                      className="mt-5 w-full light_btn">
                      Wyloguj
                    </button>
                </div>
              )}


            </div>
          ): (
            <>
            {
              providers && 
              Object.values(providers).map((provider) => (
                <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='light_btn'>
                  Zaloguj
                </button>
              ))
            }
            </>
          )}
        </div>

    </nav>
  )
}

export default Nav