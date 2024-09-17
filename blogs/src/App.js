import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home';
import AllBlogs from './Pages/AllBlogs';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AdminPanel from './Admin/AdminPanel';
import NewBlog from './Admin/NewBlog';
import Blog from './Pages/Blog';
import EditBlog from './Admin/EditBlog';

function App() {
  const route = createBrowserRouter([
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/allblogs',
      element:<AllBlogs />
    },
    {
      path:'/adminpanel',
      element:<AdminPanel />
    },
    {
      path:'/writeblogs',
      element:<NewBlog />
    },
    {
      path:'/blogs/:id',
      element:<Blog />
    },
    {
      path:'/editblogs/:id',
      element:<EditBlog />
    }
  ])
  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={route} />
      <Footer />
    </div>
  );
}

export default App;
