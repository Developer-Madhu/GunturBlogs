import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Slides = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);

  // Fetch blog data from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/allblogs');
        setBlogs(response.data.slice(0,4)); 
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [blogs]);

  // Function to truncate description
  const truncateDescription = (description) => {
    return description.length > 50 ? description.substring(0, 50) : description;
  };

  return (
    <div className="relative w-4/5 m-auto h-96 overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
        {blogs.map((blog) => (
          <div
          key={blog._id}
          className="w-full h-96 flex-shrink-0 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${blog.image})` }} 
          >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg mt-32 text-white text-center">
              <h1 className="text-3xl font-bold">{blog.title}</h1>
              <p className="mt-4 text-lg">{truncateDescription(blog.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slides;
