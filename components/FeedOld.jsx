"use client";

import { useState, useEffect} from "react";

import Spiner from "./LoadingSpiner";
import PostCard from "./PostCard";

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className="post_layout">
      {data.map((post) => (
        <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {

  // Post fetching states 
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(false); // State to track error status


  // Search states
  const [initSearch, setInitSearch] = useState(true)
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search

    return posts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          regex.test(item.animals) ||
          regex.test(item.noun)
      );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    if (initSearch) {
      setHasMore(false)
      setIsLoading(true)
      fetchRestPosts()
      setInitSearch(false)
    }

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const results = filterPosts(e.target.value);
        setSearchedResults(results);
      }, 500)
    );
  };

  const handleTagClick = (animals) => {
    setSearchText(animals);

    const result = filterPosts(animals);
    setSearchedResults(result);
  };

  const fetchRestPosts = async () => {
    const response = await fetch(`/api/post`);
    const data = await response.json();

    setPosts((prevPosts) => [...prevPosts, ...data]);
    setIsLoading(false)

  };

  useEffect(() => {
    fetchRestPosts()

  }, []);


  return (
    <section className="feed">

      <form className="relative w-full flex-center px-4 text-xs md:text-base">
        <input
          type="text"
          placeholder="szukaj rzeczowników, zwierząt lub użytkownika..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="form_textarea peer text-inter"
        />
      </form>
      
    
      <CardList data={searchText ? searchedResults : posts} handleTagClick={handleTagClick} />

      {error && (
        <div className="">
          Coś poszło nie tak...{" "}
          <button className='underline' onClick={() => {
            setError(false); // Clear the error state before retrying
            fetchMorePosts(); // Retry fetching
          }}>
            Kliknij tutaj
          </button>
        </div>
      )}


      

        {/* Show loading spinner when there are more posts to load */}
        { isLoading && <Spiner />}


      
    </section>
  );
};

export default Feed;
