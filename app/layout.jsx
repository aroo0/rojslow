import '@styles/globals.css'

import Nav from '@components/Nav'
import Footer from '@components/Footer'
import Provider from '@components/Provider'
import PageDescription from '@components/PageDescription'

export const metadata = {
    title: 'Rój Słów',
    description: 'Stwórz i odkryj nowe rzeczowniki zbiorowe.'
}

const RootLayout = ({ children }) => {

  return (
    <html lang="pl">
    <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
    </head>
    <body className='grid xl:grid-cols-3 text-black/80 gradient'>
    {/* <div className='main'>
        </div> */}
      <div className='min-h-screen col-span-2 flex flex-col justify-between pt-3'>
      <Provider>
        <main className='app'>
        <Nav />
        {children}
        </main>
      </Provider>
      <Footer />
      </div>
      <span className='hidden col-span-1 xl:block'>
      <PageDescription />
      </span>

    </body>
    </html>
  )
}

export default RootLayout