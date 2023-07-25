import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col px-4">

        <p className=' text-xl md:text-3xl font-inter font-light text-black/80 text-center z-1'>Odkrywaj i dziel się swoimi pomysłami na nowe rzeczowniki zbiorowe wśród zwierząt.</p>
        <Feed />

    </section>
  )
}

export default Home