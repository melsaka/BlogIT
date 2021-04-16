import index from '@/views/topics/index'
import create from '@/views/topics/create'
import show from '@/views/topics/show'
import edit from '@/views/topics/edit'

export default [
    {
        name: 'topics.index',
        path: '/dashboard/topics',
        component: index,
        meta: {
            middlewares: ['auth']
        }
    },
    {
        name: 'topics.create',
        path: '/dashboard/topics/create',
        component: create,
        meta: {
            middlewares: ['auth']
        }
    },
    {
        name: 'topics.show',
        path: '/dashboard/topics/:slug',
        component: show,
        meta: {
            middlewares: ['auth']
        }
    },
    {
        name: 'topics.edit',
        path: '/dashboard/topics/:slug/edit',
        component: edit,
        meta: {
            middlewares: ['auth']
        }
    }
]
