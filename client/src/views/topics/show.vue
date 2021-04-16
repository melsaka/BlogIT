<template>
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-12 mx-auto">
        <div class="-my-8 divide-y-2 divide-gray-100">
            <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest uppercase">
                {{ topic.name }}
            </span>
            <div v-for="post in posts.data" :key="post.id" class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <router-link :to="{name: 'topic', params: {slug: topic.slug}}" class="font-semibold hover:text-purple-900 title-font text-gray-700 uppercase">
                        {{ topic.name }}
                    </router-link>
                    <span class="mt-1 text-gray-500 text-sm">{{ englishDate(post.created) }}</span>
                </div>
                <div class="md:flex-grow">
                    <router-link :to="{name: 'post', params: {slug: post.slug}}">
                        <h2 class="text-2xl font-medium text-gray-900 hover:text-purple-900 title-font mb-2">
                            {{ post.title }}
                        </h2>
                    </router-link>

                    <p class="leading-relaxed">
                        {{ post.body.substr(0, 150) }}
                    </p>

                    <router-link :to="{name: 'post', params: {slug: post.slug}}" class="text-indigo-500 inline-flex hover:text-purple-900 items-center mt-4">
                        Read More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </router-link>
                </div>
            </div>

        </div>
      </div>
        <button v-if="posts.meta.nextPage" @click.prevent="loadmore()" class="btn btn-primary w-full mt-6">
            Loadmore..
        </button>
    </section>
</template>

<script>
import localizedFormat from 'dayjs/plugin/localizedFormat'
import axios from 'axios'
import dayjs from 'dayjs'

dayjs.extend(localizedFormat);

export default {
    data() {
        return {
            topic: {},
            posts: {
                data: [],
                meta: {}
            }
        }
    },
    computed: {
        topicSlug() {
            return this.$route.params.slug;
        }
    },
    created() {
        axios.get('http://localhost:5000/api/v1/topics/'+ this.topicSlug)
            .then(response => {
                this.topic = response.data;
                this.posts = response.data.posts;
            })
    },
    methods: {
        englishDate(date) {
            return dayjs(date).format('LL');
        },
        loadmore() {
            if( this.posts.meta.nextPage )
            {
                axios.get('http://localhost:5000/api/v1/topics/'+this.topicSlug+'/?page='+ this.posts.meta.nextPage).then(response => {
                    console.log(response.data.posts.data);
                        this.posts.data = [...this.posts.data, ...response.data.posts.data];
                        this.posts.meta = response.data.posts.meta;
                    })
            }
        }
    }
}
</script>
