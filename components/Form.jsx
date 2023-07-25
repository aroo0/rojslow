import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-center flex-col'>
      <div className="flex-col flex-start ">
      <h1 className='head_text text-left'>{type} rzeczownik</h1>
      <p className='desc text-left max-w-md'>
      <span>Stwórz nowy rzeczownik zbiorowy.</span>
      <br />
      <span>Pamiętaj, rzeczownik powinien dotyczyć grupy zwierząt.</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-8 glassmorphism" >
          <label>
            <span className="font-inter font-bold">Rzeczownik</span>
          <input
            value={post.noun}
            onChange={(e) =>setPost({...post, noun: e.target.value})}
            placeholder="Pisz tutaj..."
            required
            className='form_textarea  font-andada font-medium'></input>
          </label>
          <label>
            <span className="font-inter font-bold">Grupa zwierząt </span>
            <span className="italic">(l.mn) </span>
            <span className="font-light">np. koty, barany, gazele</span>
          <input
            value={post.animals}
            onChange={(e) => setPost({...post, animals: e.target.value})}
            placeholder="Koty"
            required
            className='form_textarea font-andada font-medium'></input>
          </label>
          <div className='flex-end mx-3 mb-5 gap-6'>
            <Link className=' text-black/80 text-sm' href='/'>Anuluj</Link>
            <button
              type='submit'
              disabled={submitting}
              className='light_btn text-bold'
              >
                {submitting ? `Publikuj...` : 'Publikuj'}
            </button>
          </div>
        </form>
        </div>
    </section>
  )
}

export default Form