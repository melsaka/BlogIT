<template>
	<form @submit.prevent="editPost()">
		<div class="container mx-auto">
			<h1 class="text-xl my-6">Post: {{post.title}}</h1>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Topic</span>
				</label> 
				<select v-model='post.topic' class="select select-bordered w-full">
					<option value="" disabled="disabled">Choose Post Topic</option> 
					<option :selected="post.topic.slug == topic.slug" v-for="topic in topics" :key="topic.id">{{ topic.name }}</option> 
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
				<button class="btn btn-primary">Update</button>
			</div>
		</div>
	</form>
</template>


<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

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
        postSlug() {
            return this.$route.params.slug;
        },
		...mapGetters([
			'topics',
			'posts',
		])
	},
    created() {
		axios.get('http://localhost:5000/api/v1/posts/'+ this.postSlug)
			.then((response) => {
				this.post.title = response.data.title;
				this.post.body = response.data.body;
				this.post.topic = response.data.topic.slug;
			})
    },
	methods: {
		editPost() {
			axios.put('http://localhost:5000/api/v1/posts/'+this.postSlug, this.post)
				.then(() => {
					this.posts.data.forEach(post => {
						if (post.slug == this.postSlug) {
							post.title = this.post.title;
							post.body = this.post.body;
							this.topics.forEach(topic => {
								if (topic.slug == this.post.topic) {
									post.topic = topic;
								}
							});
						}
					});
					this.$router.push({name: 'posts.index'});
				});
		}
	}
}
</script>