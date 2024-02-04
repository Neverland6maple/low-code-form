import Mock from 'mockjs';
const Random = Mock.Random;
Mock.setup({ //表示 400 毫秒 后才会返回响应内容；
  timeout: 1000
})
Mock.mock(/\/api\/form/, 'get', (options) => {
  const tags = [];
  let num = Math.floor(Math.random() * 9) + 1;
  while (num-- > 0) {
    tags.push(Random.cword(2, 5));
  }
  return {
    code: 200,
    data: {
      fid: new URL("http://localhost:8080" + options.url).searchParams.get('fid'),
      title: Random.ctitle(),
      author: Random.cname(),
      content: Random.cparagraph(),
      formData: {},
      liked: Random.integer(0, 20000),
      views: Random.integer(0, 100000),
      date: Random.date(),
      tags,
    },
  }
});
Mock.mock('/api/search', 'get', {
  code: 200,
  "data|5": [
    {
      fid: '@id',
      title: '@ctitle',
      author: '@name',
      intro: '@csentence',
      liked: '@integer(0, 20000)',
      date: '@date',
      "tags|1-10": ["@cword(2,5)"],
    }
  ]
})
