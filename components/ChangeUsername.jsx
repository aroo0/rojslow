import React from 'react'

const ChangeUsername = ({ username, setUsername, editUsernameSwitch, setEditUsernameSwitch, responseMessage, handleUsernameEditSubmit, submitting, oldUsername  }) => {
  return (
    <>

    { editUsernameSwitch 
      ? (
        <>
          <h1 className="head_text text-left">{username}</h1>
          <p 
          className="cursor-pointer"
          onClick={() => setEditUsernameSwitch(false)}>
            Edytuj
          </p>
          <p className="text-sm pt-1">{responseMessage}</p>
        </>
      )
      : (<>
      <form
        onSubmit={handleUsernameEditSubmit}
        className="flex items-center gap-8">
        <span>
          <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form_textarea font-andada text-2xl"
          pattern="^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?<![_.])$"
          required />
          <p className="text-xs pt-1">*Nazwa uzytkownika musi składać się co najmniej z 4 znaków.</p>
        </span>
        <button 
          type='submit'
          disabled={submitting}
          className="light_btn text-bold">
          {submitting ? 'Zapisuje...' : 'Zapisz' }</button>
        <p 
          className="text-black/80 text-sm cursor-pointer"
          onClick={() => {
            setUsername(oldUsername)
            setEditUsernameSwitch(true)
            }}>Anuluj</p>
      </form>
          </>) 
    }
    </>
  )
}

export default ChangeUsername