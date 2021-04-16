import index from '@/views/posts/index'
import create from '@/views/posts/create'
import show from '@/views/posts/show'
import edit from '@/views/posts/edit'

export default [
    {
        name: 'posts.index',
        path: '/dashboard/posts',
        component: index,
        meta: {
            middlewares: ['auth']
        }
    },
    {
        name: 'posts.create',
        path: '/dashboard/posts/create',
        component: create,
        meta: {
            middlewares: ['auth']
        }
    },
    {
        name: 'posts.show',
        path: '/dashboard/posts/:slug',
        component: show,
        meta: {
            middlewares: ['auth']
        }
    },
    {
        name: 'posts.edit',
        path: '/dashboard/posts/:slug/edit',
        component: edit,
        meta: {
            middlewares: ['auth']
        }
    }
]
