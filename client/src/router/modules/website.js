import home from '@/views/home'
import post from '@/views/post'
import topic from '@/views/topic'
import topics from '@/views/topics'

export default [
    {
        name: 'home',
        path: '/home',
        component: home
    },
    {
        name: 'post',
        path: '/posts/:slug',
        component: post
    },
    {
        name: 'topic',
        path: '/topics/:slug',
        component: topic
    },
    {
        name: 'topics',
        path: '/topics',
        component: topics
    }
]
