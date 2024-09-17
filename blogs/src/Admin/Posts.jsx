import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { CaretDoubleRight, Pencil, Trash } from 'phosphor-react';

const Posts = () => {
  const [blogs, setBlogs] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/allblogs');
        setBlogs(response.data); 
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-20 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">

          {blogs.map((blog) => (
            <div key={blog._id} className="py-8 flex flex-wrap md:flex-nowrap">
              {/* Image container */}
              <div className="w-full md:w-64 md:mb-0 mb-6 flex-shrink-0">
                <div className="imagelink m-5 h-32 w-32 md:w-48 md:h-48 flex justify-center items-center">
                  <img
                    className="object-cover md:w-full w-full h-full rounded-lg"
                    src={blog.image}
                    alt={blog.title}
                  />
                </div>
              </div>
              <div className="md:flex-grow flex flex-col justify-center">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                  {blog.title}
                </h2>
                <p className="leading-relaxed">{blog.description.slice(0,100)}</p><br />

                {/* Action buttons */}
                {/* <div className="flex w-40 justify-around mt-4">
                  <Trash size={22} />
                  <Pencil size={22} />
                </div> */}
                <div className="flex mt-4">
                  <h1><a href={`/blogs/${blog._id}`}>Read More</a></h1>
                </div>
              </div>
            </div>
            ))}

        </div>
      </div>
    </section>
  );
}

export default Posts;
