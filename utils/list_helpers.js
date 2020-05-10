exports.totalLikes = blogs => {
  // let sum = 0;
  // blogs.forEach(blog => (sum += blog.likes));
  const reducer = (likesSum, blog) => likesSum + blog.likes;

  return blogs.reduce(reducer, 0);
};

exports.mostBlogs = blogs => {
  return 1;
};
