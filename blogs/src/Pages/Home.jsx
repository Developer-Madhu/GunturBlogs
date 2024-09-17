import React from 'react'
import ThreePosts from '../Components/ThreePosts'
import Slides from '../Components/Slides'
import Gallery from '../Admin/Stats'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Content from '../Components/Content'

const Home = () => {
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
        <div className='homepage'>

            <br />
            
            <Slides />

            <ThreePosts />

            <Content />

        </div>
    )
}

export default Home