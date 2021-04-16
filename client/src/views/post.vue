<template>
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-12 mx-auto">
        <div class="flex flex-wrap -m-12">
          <div class="p-12 md:w-5/6 lg:w-2/3 flex flex-col items-start mx-auto">
            <router-link :to="{name: 'topic', params: {slug: post.topic.slug}}" class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest uppercase">
                {{ post.topic.name }}
            </router-link>
            <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                {{ post.title }}
            </h2>
            <p class="leading-relaxed mb-8">{{ post.body }}</p>
          </div>
        </div>
    </div>
</section>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            post: {
                topic:{}
            }
        }
    },
    computed: {
        postId() {
            return this.$route.params.slug;
        }
    },
    created() {
        axios.get('http://localhost:5000/api/v1/posts/'+this.postId)
            .then(response => {
                this.post = response.data;
            })
    }
}
</script>
