import ChangeUsername from "./ChangeUsername";
import PostCard from "./PostCard";

const Profile = ( { username, oldUsername, setUsername, responseMessage, desc, data, handleEdit, handleDelete, setEditUsernameSwitch, editUsernameSwitch, handleUsernameEditSubmit, submitting }) => {

  return (
    <section className='w-full flex-start flex-col'>
      <div className="flex gap-6 items-end h-20">
        {handleUsernameEditSubmit 
        ? (<ChangeUsername
              username={username}
              setUsername={setUsername}
              editUsernameSwitch={editUsernameSwitch}
              setEditUsernameSwitch={setEditUsernameSwitch}
              responseMessage={responseMessage}
              handleUsernameEditSubmit={handleUsernameEditSubmit}
              submitting={submitting}
              oldUsername={oldUsername}
            />)
        : (<h1 className="head_text text-left">{username}</h1>)}
      </div>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
      {data.map((post) => (
        <PostCard 
          key={post._id} 
          post={post} 
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}  />
        ))}
      </div>
    </section>
  )
};

export default Profile;
