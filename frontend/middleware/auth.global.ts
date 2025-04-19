export default defineNuxtRouteMiddleware((to) => {
  const token = useState('token').value
  if (!token && to.path.startsWith('/polls')) {
    return navigateTo('/login')
  }
})
