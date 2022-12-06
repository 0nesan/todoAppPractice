const API_KEY = process.env.API_KEY as string;
const API_URL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const USER_NAME = 'KDT3_HanSooSan'
const HEADER = {
  'content-type': 'application/json',
  'apikey': API_KEY,
  'username': USER_NAME
}

const getData =  async (method:string = 'GET', body:string = '', id:string = '') => {
  const res = await fetch(API_URL + '/' + id, {
    method: method,
    headers: HEADER,
    body:body !== '' ? body : null
  })
  const json = await res.json()

  return json
};

export { getData }
