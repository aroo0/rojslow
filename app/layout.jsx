import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Rój Słów',
    description: 'Stwórz i odkryj nowe rzeczyowniki zbiorowe.'
}

const RootLayout = ({ children }) => {
  return (
    <html lang="pl">
    <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <Provider>
        <div className='main'>
        </div>
        <main className='app px-8'>
        <Nav />
            {children}
        </main>
      </Provider>
    </body>
    </html>
  )
}

export default RootLayout