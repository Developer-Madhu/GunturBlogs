import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get URL parameters
import axios from 'axios';
import SubPosts from '../Components/SubPosts'

const Blog = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(`http://localhost:3001/blogs/${id}`); // Fetch blog by ID
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching the blog:', error);
      }
    }
    fetchBlog();
  }, [id]);

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <br />
        <img className="w-full object-cover h-64 mb-6" src={blog.image || 'https://dummyimage.com/'} alt={blog.title}/>
        <br />
        <p className="text-lg leading-relaxed">{blog.description}</p>
      </div>
      <br />
      <SubPosts />
    </div>
  );
}

export default Blog;