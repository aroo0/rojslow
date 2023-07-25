"use client";

import { useState, useEffect, useRef } from "react";

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
  const [offset, setOffset] = useState(0); // Number of posts already fetched
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more posts to fetch
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  // Ref to the bottom of the page element as fetch start
  const bottomElementRef = useRef();

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


  // Function to fetch more posts when user reaches the bottom of the page
  const fetchMorePosts = async () => {

    if (!hasMore || isLoading) return; // If there are no more posts to fetch, return
    
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`/api/post?offset=${offset}&limit=15`);
      const data = await response.json();
  
      if (data.length === 0) {
        // If no new posts are fetched, set hasMore to false to stop infinite scroll
        setHasMore(false);
      } else {
        // Append new posts to the existing list
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setOffset((prevOffset) => prevOffset + data.length); // Increment the offset
      }
      setIsLoading(false); // Stop loading
      
    } catch (error) {
      console.log('Faild to load')
    }
  };

  const fetchRestPosts = async () => {
    const response = await fetch(`/api/post?offset=${offset}`);
    const data = await response.json();

    setPosts((prevPosts) => [...prevPosts, ...data]);
    setIsLoading(false)

  };

  




  // Effect to fetch more posts when the user reaches the bottom of the page
  useEffect(() => {
    if (!bottomElementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts();
        }
      },
      { threshold: .5 }
    );

    observer.observe(bottomElementRef.current);

    return () => {
      if (bottomElementRef.current) {
        observer.unobserve(bottomElementRef.current);
      }
    };
  }, [bottomElementRef, offset]);


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


      

        {/* Show loading spinner when there are more posts to load */}
        {hasMore && isLoading && <Spiner />}

        {/* Show message when there are no more posts to load */}
        {!hasMore && <p className="py-8"> Oto koniec.</p> }

        <div ref={bottomElementRef}></div>
      
    </section>
  );
};

export default Feed;
