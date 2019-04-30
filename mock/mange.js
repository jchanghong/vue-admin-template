import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})
const datamanage = Mock.mock({
  'items|30': [
    {
    orgId: '@id',
      orgName: '沙坪坝',
      jobtimes: '2019/04/15 22:45:27',
      version: '1',
      itemcount: '@integer(300, 5000)',
      erroritems: '@integer(300, 5000)',
      onlineCount: '@integer(300, 5000)',
      pushCount: '@integer(300, 5000)',
      thirdCount: '@integer(300, 5000)',
      third_erroritems: '@integer(300, 5000)',
      nomalCount: '@integer(300, 5000)',
      third_nomalCount: '@integer(300, 5000)',
      nomalCountAll: '@integer(300, 5000)',
      thirdOnlineCount: '@integer(300, 5000)',
      percent_third_online: '@integer(300, 5000)',
      percent_hundrund_number: '@integer(300, 5000)',
      hundrund_number: '@integer(300, 5000)',
      score_norm_number: '@integer(300, 5000)',
      score_online: '@integer(300, 5000)',
      score_self: '@integer(300, 5000)',
      selfOnlineCount: '@integer(300, 5000)',
      selfCount: '@integer(300, 5000)',
      percent_self: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/table/manage',
    type: 'get',
    response: config => {
      const items = datamanage.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
