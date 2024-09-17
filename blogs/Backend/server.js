const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Blog = require('./model');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use('/store', express.static(path.join(__dirname, 'store')));

const storage = multer.diskStorage({
  destination: (cb) => {
    const dirpath = path.join(__dirname, 'store')
    cb(null, dirpath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/gunturBlogs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log("Connected Mongodb Successfully"))

app.post('/writeblogs', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `/store/${req.file.filename}` : req.body.image;

    const newBlog = new Blog({title, description,image});

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
}); 

app.get('/allblogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({createdAt:-1});
    res.status(200).json(blogs); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
})

app.get('/blogs/:_id', async(req,res) => {
  try {
    const blog = await Blog.findById(req.params._id); 
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error, could not fetch blog' });
  }
})

app.delete('/blogs/:_id', async (req,res) => {
  try{
    const delBlog = await Blog.findByIdAndDelete(req.params._id)
    if(!delBlog){
      return "Blog already deleted"
    }
    else{
      return "Blog deleted successfully"
    }
  } catch(err){
    console.log("Error deleting blog", err)
  }

})

// Backend (Node.js/Express)
app.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog' });
  }
});


app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
