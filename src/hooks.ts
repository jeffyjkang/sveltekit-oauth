import cookie from 'cookie'

export async function handle({request, resolve}) {
  const cookies = cookie.parse(request.headers.cookie || {user: null})
  request.locals.user = cookies.user
  const res = await resolve(request)
  res.headers['set-cookie'] = `user=${request.locals.user || ''}; path=/; HttpOnly`
  return res
}

export async function getSession(request) {
  return {
    user: request.locals.user
  }
}
