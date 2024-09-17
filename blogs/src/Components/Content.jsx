import axios from 'axios';
import { useEffect, useState } from 'react';

const Content = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/allblogs');
        setBlogs(response.data.slice(1, 5)); // Fetch 4 blogs
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Recently Uploaded...
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Read the recently uploaded blogs which are on the news, know about the recent news by connecting with our blogs
          </p>
        </div>

        <div className="flex flex-wrap -m-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg h-full flex flex-col justify-between">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={blog.image}
                  alt={blog.title}
                />
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  {blog.title}
                </h2>
                <p className="leading-relaxed text-base mb-4 flex-grow">
                  {blog.description.substring(0, 50)}...
                </p>
                <a href={`/blogs/${blog._id}`} className="text-indigo-500 inline-flex items-center mt-auto">
                  Read More
                </a>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

export default Content;
