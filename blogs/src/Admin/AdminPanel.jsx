import Stats from './Stats';
import Posts from './Posts';
import AdminPosts from '../Admin/AdminPosts'

function AdminPanel() {

  return (
    <div>
      <br /><br />
      <h1 className='text-3xl text-center'><b>Admin Dashboard</b></h1>
      <br />
      <Stats />
      <br />
      <h2 className='text-center font-semibold text-3xl'>Your Posts</h2>
      <AdminPosts />
    </div>
  );
}

export default AdminPanel;
