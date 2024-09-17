import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Stats = () => {
  const [blog, setBlogs] = useState([])
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
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-evenly text-center">
            <div className="w-3/4 m-auto flex justify-evenly">
              <button className='bg-blue-400 p-4 text-xl w-auto rounded-md text-white'><a href="/writeblogs" target='_blank'>Create New Blog</a> <span className='text-white'>+</span></button>
            </div>
          </div>
        </div>
      </section>
      <br />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-18 mx-auto">
          <div className="flex flex-wrap -m-4 justify-evenly text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">Active</h2>
              <p className="leading-relaxed">Website Status</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">Connected</h2>
              <p className="leading-relaxed">Database</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{blog.length}</h2>
              <p className="leading-relaxed">Blogs</p>
            </div>
          </div>
        </div>
      </section>
      <br />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-evenly text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <button className='bg-red-500 p-5 rounded-md text-white font-bold'>Deactivate Website</button>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <button className='bg-red-500 p-5 rounded-md text-white font-bold'>Disconnect Database</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Stats;
