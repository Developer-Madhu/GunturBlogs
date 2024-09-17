import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams();  // Get the blog ID from the URL params
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: '', description: '', image: '' });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blogs/${id}`);
        setBlog(response.data)
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/blogs/${id}`, blog);
      alert('Blog updated successfully!');
      navigate(`/allblogs`);
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating the blog.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Blog</h2>

        <form>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input className="border p-3 w-full rounded-lg" type="text" name="title" value={blog.title} onChange={handleInputChange} required/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea className="border p-3 w-full rounded-lg" name="description" value={blog.description} onChange={handleInputChange} required/>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input className="border p-3 w-full rounded-lg" type="text" name="image" value={blog.image} onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-center">
            <button onClick={handleSubmit} type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 w-full">Update Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
