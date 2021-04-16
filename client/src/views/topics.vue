<template>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-12 mx-auto">
        <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            
            <div v-for="topic in topics" :key="topic.id" class="p-2 sm:w-1/2 w-full">
                <router-link :to="{name: 'topic', params: {slug: topic.slug}}" class="title-font font-medium capitalize">
                    <div class="bg-gray-100 hover:bg-purple-100 rounded flex p-4 h-full items-center">
                        {{ topic.name }}
                    </div>
                </router-link>
            </div>
            
        </div>
      </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'topics'
        ])
    }
}
</script>
