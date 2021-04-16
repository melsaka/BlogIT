<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-12 mx-auto">
            <div class="pb-5 border-b">
                <router-link :to="{name: 'topics.create'}" class="btn btn-secondary btn-sm">
                    Create Topic
                </router-link>
            </div>
            <div v-for="topic in topics" :key="topic.id" class="flex-row items-center space-x-4 card-body border-b">
                <div class="flex-1">
                    <router-link :to="{name: 'topics.show', params: {slug: topic.slug}}">
                        <h2 class="card-title">
                            {{ topic.name }}
                        </h2>
                    </router-link>
                </div>
                <div class="flex-0">
                    <router-link :to="{name: 'topics.edit', params: {slug: topic.slug}}" class="btn btn-primary btn-sm mr-2">
                        Edit
                    </router-link>
                    <form class="inline" @submit.prevent="removeTopic(topic.slug)">
                        <button class="btn btn-ghost btn-sm">Delete</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    computed: {
        ...mapGetters([
            'topics'
        ])
    },
    methods: {
        ...mapActions([
            'deleteTopic'
        ]),
        removeTopic(slug) {
            axios.delete('http://localhost:5000/api/v1/topics/'+slug)
                .then(() => {
                    this.deleteTopic(slug);
                })
        }
    }
}
</script>
