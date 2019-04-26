import Request from 'util/Request'
export default [
  new Request({
    name: 'get_bulletin',
    url: '/api/bulletin/',
    data_type: 'Bulletin',
    type: Request.LIST,
    allow_repeat: false
  })
]
