<template>
	<form @submit.prevent="editTopic()">
		<div class="container mx-auto">
			<h1 class="text-xl my-6">Topic: {{topic.name}}</h1>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Name</span>
				</label> 
				<input v-model="topic.name" type="text" placeholder="Topic Name" class="input input-bordered">
			</div>
			<div class="form-control mt-3">
				<button class="btn btn-primary">Update</button>
			</div>
		</div>
	</form>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
	data() {
		return {
			topic: {},
			errors: {}
		}
	},
    computed: {
        topicSlug() {
            return this.$route.params.slug;
        },
        ...mapGetters([
            'topics'
        ])
    },
    created() {
		axios.get('http://localhost:5000/api/v1/topics/'+ this.topicSlug)
			.then((response) => {
				this.topic = response.data;
			})
    },
	methods: {
		editTopic() {
			axios.put('http://localhost:5000/api/v1/topics/'+ this.topicSlug, {name: this.topic.name})
				.then(() => {
					this.topics.forEach(topic => {
						if (topic.slug == this.topicSlug) {
							topic.name = this.topic.name
						}
					});

					this.$router.push({name: 'topics.index'});
				})
		}
	}
}
</script>