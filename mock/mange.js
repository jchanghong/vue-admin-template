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
  'items|30': [{
    orgId: '@id',
    orgName: "沙坪坝",
    jobtimes: "2019/04/15 22:45:27",
    version: 2
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
