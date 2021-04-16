<template>
    <div id="app">
        <header class="text-gray-600 body-font">
          <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                <router-link :to="{name: 'home'}" class="mr-5 hover:text font-bold hover:text-purple-900">Home</router-link>
                <router-link :to="{name: 'topics'}" class="mr-5 font-bold hover:text-purple-900">Topics</router-link>
            </nav>
            <router-link :to="{name: 'home'}" class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                <img class="w-8 h-8 mr-1 text-white" src="/logo.svg">
                <span class="text-xl">LOG IT</span>
            </router-link>
            <div v-if="!isAuth" class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                <router-link :to="{name: 'register'}" class="inline-flex items-center bg-purple-100 border-0 mr-1 py-1 px-3 focus:outline-none hover:bg-purple-200 rounded text-base mt-4 md:mt-0">
                    Register
                </router-link>
                <router-link :to="{name: 'login'}" class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                    Login
                </router-link>
            </div>

            <div v-if="isAuth" class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                <form @submit.prevent="logout()">
                    <button class="inline-flex items-center bg-purple-100 border-0 py-1 px-3 focus:outline-none hover:bg-purple-200 rounded text-base mt-4 md:mt-0">
                        Logout
                    </button>
                </form>
            </div>
          </div>
        </header>

        <div v-if="isAuth" class="navbar mb-2 shadow-lg bg-neutral text-neutral-content ">
        
            <div class="container mx-auto">    
                <div class="flex-1 px-2 mx-2">
                    <span class="text-lg font-bold">
                        Dashboard
                    </span>
                </div> 
                <div class="flex-none px-2 mx-2 lg:flex">
                    <div class="flex items-stretch">
                        <router-link :to="{ name: 'topics.index' }" class="btn btn-ghost btn-sm rounded-btn">
                            Topics
                        </router-link> 
                        <router-link :to="{ name: 'posts.index' }" class="btn btn-ghost btn-sm rounded-btn">
                            Posts
                        </router-link> 
                    </div>
                </div>
            </div>

        </div>
        <router-view/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default {
    methods: {
        ...mapActions([
            'setPosts',
            'setTopics',
            'logout'
        ])
    },
    computed: {
        ...mapGetters([
            'isAuth',
        ])
    },
    created() {
        axios.get('http://localhost:5000/api/v1/posts').then(response => {
            this.setPosts(response.data);
        })

        axios.get('http://localhost:5000/api/v1/topics').then(response => {
            this.setTopics(response.data);
        })
    }
}
</script>
