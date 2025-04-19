export const useAuth = () => {
  const user = useState('user', () => null)
  const token = useState('token', () => '')

  const login = (data: any) => {
    user.value = data.user
    token.value = data.token
    localStorage.setItem('token', data.token)
  }

  const logout = () => {
    user.value = null
    token.value = ''
    localStorage.removeItem('token')
  }

  return { user, token, login, logout }
}
