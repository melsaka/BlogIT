<template>
<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div class="lg:w-2/6 md:w-1/2 mx-auto bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
            <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
            <form @submit.prevent="logmeIn()">
                <div class="relative mb-4">
                    <label for="username" class="leading-7 text-sm text-gray-600">Username</label>
                    <input v-model="username" type="text" id="username" name="username" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <div class="relative mb-4">
                    <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                    <input v-model="password" type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autocomplete="off">
                </div>
                <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
            </form>
        </div>
    </div>
</section>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        ...mapActions([
            'login'
        ]),
        logmeIn() {
            axios.post('http://localhost:5000/api/v1/auth/login', {username: this.username, password: this.password})
            .then(response => {
                axios.defaults.headers.common['Authorization'] = 'Barrer ' + response.data.accessToken;
                this.login({token: response.data.accessToken});
                this.$router.push({name: 'home'});
            })
        }
    }
}
</script>