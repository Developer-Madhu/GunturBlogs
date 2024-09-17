import React, { useState } from 'react';
import { Paperclip, UploadSimple } from 'phosphor-react';
import axios from 'axios';

const NewBlog = () => {
  const [imageOption, setImageOption] = useState('upload');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl('');
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setFile(null);
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    const blogData = new FormData();
    blogData.append('title', title);
    blogData.append('description', description); 
    if (file) {
      blogData.append('image', file); 
    } else if (imageUrl) {
      blogData.append('image', imageUrl);
    }

    try {
      // POST request to the server
      const response = await axios.post('http://localhost:3001/writeblogs', blogData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Blog created successfully:', response.data);
      // You can redirect or show a success message here
    } catch (error) {
      console.error('Error creating the blog:', error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold title-font mb-6 text-gray-900">Create a New Blog Post</h1>
          <form>
            {/* Title Input */}
            <div className="mb-8">
              <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-4">Blog Title</label>
              <input
                name='title'
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full outline-none border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-2xl font-semibold py-4 px-6 bg-gray-50"
                placeholder="Enter your blog title here..."
              />
            </div>

            {/* Image Upload or URL Selection */}
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-4">Image</label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setImageOption('upload')}
                  className={`py-2 px-4 border rounded-md ${imageOption === 'upload' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                >
                  <UploadSimple className="w-5 h-5 inline mr-2" />
                  Upload from Computer
                </button>
                <button
                  type="button"
                  onClick={() => setImageOption('url')}
                  className={`py-2 px-4 border rounded-md ${imageOption === 'url' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                >
                  <Paperclip className="w-5 h-5 inline mr-2" />
                  Use Image URL
                </button>
              </div>
              {imageOption === 'upload' && (
                <input
                name='image'
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-4 block w-full text-gray-700"
                />
              )}

              {imageOption === 'url' && (
                <input
                name='imageurl'
                  type="text"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  className="mt-4 block w-full outline-none p-5 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter image URL"
                />
              )}
              <br /><br />

              {/* Description Input */}
              <div className="mb-8">
                <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-4">Blog Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="block w-full outline-none border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg py-4 px-6 bg-gray-50"
                  placeholder="Enter a brief description of your blog..."
                ></textarea>
              </div>


            </div>

            {/* Publish Button */}
            <button
            onClick={handleSubmit}
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Publish
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewBlog;
