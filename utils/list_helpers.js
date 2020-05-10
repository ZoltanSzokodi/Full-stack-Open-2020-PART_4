exports.totalLikes = blogs => {
  const reducer = (likesSum, blog) => likesSum + blog.likes;

  return blogs.reduce(reducer, 0);
};

exports.mostBlogs = blogs => {
  let sumsObj = {};
  let returnObj = {
    author: '',
    blogs: 0,
  };

  blogs.forEach(blog => {
    if (sumsObj[blog.author]) {
      sumsObj[blog.author]++;
    } else {
      sumsObj[blog.author] = 1;
    }
  });

  for (let key in sumsObj) {
    if (sumsObj[key] >= returnObj.blogs) {
      returnObj.author = key;
      returnObj.blogs = sumsObj[key];
    }
  }
  return returnObj;
};
