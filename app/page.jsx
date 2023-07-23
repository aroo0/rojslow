import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">

        <p className='text-2xl font-inter text-black/80 text-center z-1'>Odkrywaj i dziel się swoimi pomysłami na nowe rzeczowniki zbiorowe wśród zwierząt.</p>
        <Feed />

    </section>
  )
}

export default Home