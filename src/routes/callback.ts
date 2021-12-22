const clientId = import.meta.env.VITE_CLIENT_ID
const secret = import.meta.env.VITE_CLIENT_SECRET
const tokenURL = 'https://github.com/login/oauth/access_token'
const userURL = 'https://api.github.com/user'

export async function get(request) {
  const code = request.query.get('code')
  const token = await getToken(code)
  const user = await getUser(token)
  request.locals.user = user.login
  
  return {
    status: 302,
    headers: {
      location: '/'
    }
  }
  //return {
    //body: JSON.stringify(user, null, 2)
  //}
}

function getUser(token) {
  return fetch(userURL, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => res.json());
}

function getToken(code) {
  return fetch(tokenURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: secret,
      code
    })
  }).then((res) => res.json())
  .then((res) => res.access_token)
}

