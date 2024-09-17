import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThreePosts = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch the latest blog data from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/allblogs');
        // Assuming the response is sorted by newest first, limit to the latest 3 posts
        setBlogs(response.data.slice(0, 3)); 
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    fetchData();
  }, []); // Empty dependency array to only run once when the component mounts

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {blogs.map((blog, index) => (
            <div className="p-4 md:w-1/3" key={blog._id}>
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={blog.image} // Dynamic image URL
                  alt={blog.title}
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">BLOG POST</h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{blog.title}</h1>
                  <p className="leading-relaxed mb-3">
                    {blog.description.length > 100 ? blog.description.slice(0, 50) + '...' : blog.description}
                  </p>
                  <div className="flex items-center justify-between flex-wrap">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" href={`/blogs/${blog._id}`}>
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePosts;
