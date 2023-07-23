"use client";

import { useState, useEffect } from "react";


import PostCard from "./PostCard";

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Search states
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

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (animals) => {
    setSearchText(animals);

    const searchResult = filterPosts(animals);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="szukaj rzeczowników, zwierząt lub użytkownika..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="form_textarea peer text-inter"
        />
      </form>
        {/* All Prompts */}
        {searchText ? (
        <CardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <CardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
