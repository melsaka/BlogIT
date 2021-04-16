import login from '@/views/auth/login'
import register from '@/views/auth/register'

export default [
    {
        name: 'login',
        path: '/login',
        component: login,
        meta: {
            middlewares: ['guest']
        }
    },
    {
        name: 'register',
        path: '/register',
        component: register,
        meta: {
            middlewares: ['guest']
        }
    }
]
