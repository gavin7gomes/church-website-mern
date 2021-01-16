const express = require("express");
const schedule = require('node-schedule');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post("/", [ auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('author', 'Author is required').not().isEmpty(),
]], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

try {

  const newPost = new Post({
    title: req.body.title,
    tags: req.body.tags,
    author: req.body.author,
    author_designation: req.body.author_designation,
    img_url: req.body.img_url,
    content1: req.body.content1,
    content2: req.body.content2,
    content3: req.body.content3,
    excerpt: req.body.excerpt,
    post_date: req.body.post_date
  });

if(req.body.post_date){
   const pdate = req.body.post_date;
  


 const date_time_array = pdate.split('T');
 const date = date_time_array[0];
 const time = date_time_array[1];
 const sdate = date.split('-');
 const stime = time.split(':');
 const yyyy = sdate[0];
 const mm = sdate[1] - 1;
 const dd = sdate[2];
 const hour = stime[0];
 const min = stime[1];
 
 const somedate = new Date(yyyy, mm, dd, hour, min);


schedule.scheduleJob(somedate, async function(){
    const post = await newPost.save();
    res.json(post);
});

}else{
  const post = await newPost.save();
    res.json(post);
}


} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}
});


// @route   GET api/posts
// @desc    Get all posts
// @access  Public

router.get('/', async(req, res) => {
  try {
    const posts = await Post.find().sort({ "createdAt": -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
  res.status(500).send('Server Error');
  }
})


// @route   GET api/post/:id
// @desc    Get post by id
// @access  Public

router.get('/:id', async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({ msg: 'Post not Found '});
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'Post not Found '});
    }
  res.status(500).send('Server Error');
  }
})



// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

router.delete('/:id', auth, async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if(!post){
      return res.status(404).json({ msg: 'Post not Found '});
    }

    await post.remove();
    
    res.json({ msg: 'Post removed '});
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'Post not Found '});
    }
  res.status(500).send('Server Error');
  }
})



module.exports = router;
