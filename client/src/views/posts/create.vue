<template>
	<form @submit.prevent="createPost()">
		<div class="container mx-auto">
			<h1 class="text-xl my-6">New Post</h1>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Topic</span>
				</label> 
				<select v-model='post.topic' class="select select-bordered w-full">
					<option value="" disabled="disabled" selected="selected">Choose Post Topic</option> 
					<option v-for="topic in topics" :key="topic.id">{{ topic.name }}</option> 
				</select>
			</div>
			<div class="form-control mt-3">
				<label class="label">
					<span class="label-text">Title</span>
				</label> 
				<input v-model='post.title' type="text" placeholder="Post title" class="input input-bordered">
			</div>
			<div class="form-control mt-3">
				<label class="label">
					<span class="label-text">Body</span>
				</label> 
				<textarea v-model='post.body' class="textarea h-24 textarea textarea-bordered" placeholder="Post Body"></textarea>
			</div>
			<div class="form-control mt-3">
				<button class="btn btn-primary">Create</button>
			</div>
		</div>
	</form>
</template>


<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
	data() {
		return {
			post: {
				title: '',
				body: '',
				topic: ''
			},
			errors: {}
		}
	},
	computed: {
		...mapGetters([
			'topics',
			'posts',
		])
	},
	methods: {
		...mapActions([
            'setPosts',
        ]),
		createPost() {
			axios.post('http://localhost:5000/api/v1/posts', this.post)
				.then(() => {
					axios.get('http://localhost:5000/api/v1/posts').then(response => {
						this.setPosts(response.data);
					})
					this.$router.push({name: 'posts.index'});
				})
		}
	}
}
</script>