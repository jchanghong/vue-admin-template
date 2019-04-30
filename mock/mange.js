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
  'items|40': [
    {
       id : '@integer(1, 50)',
       parentId : '@integer(1, 50)',
       name :  '@sentence(1, 10)' ,
       dbType : '@integer(0, 1)',
       dburl :  '@integer(300, 5000)' ,
       dbuser :  '@integer(300, 5000)' ,
       dbpassword :  '@integer(300, 5000)' ,
       jobtime :  '@datetime' ,
       cmsCascadeId : '@integer(300, 5000)',
       loginUser :  '@integer(300, 5000)' ,
       loginPassword :  '@integer(300, 5000)' ,
       xulie :  '@integer(300, 5000)' ,
       police_number : '@integer(300, 5000)',
       all_online : '@integer(300, 5000)',
       all_all : '@integer(300, 5000)',
       yz_online : '@integer(300, 5000)',
       yz_all : '@integer(300, 5000)',
       yz_normal : '@integer(300, 5000)',
       other_online : '@integer(300, 5000)',
       other_all : '@integer(300, 5000)',
       other_normal : '@integer(300, 5000)',
       push : '@integer(300, 5000)'
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
