const { totalLikes, mostBlogs } = require('../utils/list_helpers');
const { blogs, listWithOneBlog } = require('./data_for_testing');

// TOTAL LIKES ===========================
describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);

    expect(result).toBe(5);
  });

  test('when list has many blogs add up all the likes', () => {
    const result = totalLikes(blogs);

    expect(result).toBe(36);
  });

  test('when list is empty the return value should be 0', () => {
    const result = totalLikes([]);

    expect(result).toBe(0);
  });
});

// MOST BLOGS ===========================
describe('most blogs', () => {
  test.only('dummy to be one', () => {
    expect(mostBlogs(blogs)).toBe(1);
  });
});
