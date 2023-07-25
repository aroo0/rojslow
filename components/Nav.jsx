'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Avatar from '@components/Avatar'
import PageDescription from "./PageDescription"

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [toggleDisplayInfo, setToggleDisplayInfo] = useState(false)

  const dropdownRef = useRef(null);



  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }
    fetchProviders()

    // Close dropdown when clicking anywhere else on the page
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    // Add or remove the 'overflow-hidden' class on the body when toggleDisplayInfo changes
    if (toggleDisplayInfo) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [toggleDisplayInfo]);




  return (
    <>
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href='/' className='text-black/80 font-andada lg:text-lg font-bold tracking-widest border-b-[3px] border-black/80 pb-2'>
            rójsłów.pl
        </Link>

        {/* Desktop Navigation */}

        <div className="sm:flex hidden">
        <div className="flex gap-4 md:gap-5 items-center">
          {session?.user ? (
            <>
              <Link href='/create-post' className="light_btn"> 
              Stwórz rzeczownik</Link>
              <button type="button" onClick={() => setToggleDisplayInfo(true)}  className="xl:hidden font-light hover: transition-all"> Rzeczowniki zbiorowe
            </button>
            <button type="button" onClick={signOut} className='font-light hover: transition-all'>Wyloguj</button>

            <Link href='/profile'>
            <Avatar id={session?.user.id}/> 
            </Link>
            </>
          ) : (
            <>
            <button 
              type="button"
              onClick={() => setToggleDisplayInfo(true)} 
              className="xl:hidden font-light hover: transition-all">
              Rzeczowniki zbiorowe
            </button>

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
        </div>
        <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className="flex">
              <div onClick={() => setToggleDropdown((prev) => !prev)}>
            <Avatar id={session?.user.id}
              ></Avatar>
              </div>

              {toggleDropdown && (
                <div className='dropdown z-10' ref={dropdownRef}>
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
                      onClick={() => setToggleDisplayInfo(true)} 
                      className="dropdown_link">
                      Rzeczowniki zbiorowe
                    </button>
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
            <div className="flex gap-4">
            <button 
              type="button"
              onClick={() => setToggleDisplayInfo(true)} 
              className="text-sm sm:text-base">
              Rzeczowniki zbiorowe
            </button>
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
            </div>
          )}
        </div>
    </nav>
    {toggleDisplayInfo && 
    <div>
      <div className="absolute flex flex-col z-50 top-0 left-0 h-full">
        <button className="z-120 rounded-full border border-white/10 bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur p-1 self-end fixed top-4 right-4" onClick={() => setToggleDisplayInfo(false)}>
          <Image
            src='/assets/icons/PhX.svg'
            alt='x'
            width={23}
            height={25}
            className="opacity-80 " />
          </button>
          <div className="overflow-y-auto">
            <PageDescription />
        </div>
        <div className="main"></div>
      </div>
    </div>}
    </>
  )
}

export default Nav