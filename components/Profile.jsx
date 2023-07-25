import ChangeUsername from "./ChangeUsername";
import PostCard from "./PostCard";
import Spiner from "./LoadingSpiner";

const Profile = ( { username, oldUsername, setUsername, responseMessage, desc, data, isLoading, hasMore, bottomElementRef, handleEdit, handleDelete, setEditUsernameSwitch, editUsernameSwitch, handleUsernameEditSubmit, submitting }) => {

  return (
    <section className='max-w-6xl mx-auto px-4'>
      <div className="self-stretch">
      <div className="flex gap-6 items-end min-h-16 flex-wrap">
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
      </div>
      <div className="mt-10 post_layout">
      {data.map((post) => (
        <PostCard 
          key={post._id} 
          post={post} 
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}  />
        ))}
      </div>
        {/* Show loading spinner when there are more posts to load */}
        {hasMore && isLoading && <Spiner />}

        {/* Show message when there are no more posts to load */}
        {hasMore && <div ref={bottomElementRef}></div>}

    </section>
  )
};

export default Profile;
