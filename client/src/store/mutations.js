export default {
    login: (state, payload) => {
		state.auth = true; 
		state.token = payload.token;
    },
    logout: (state) => {
		state.auth = false; 
		state.token = '';
    },
    deletePost: (state, payload) => {
        state.posts.forEach((post, index) => {
            if (post.slug == payload) {
                state.posts.splice(index,1);
            }
        })
    },
    deleteTopic: (state, payload) => {
        state.topics.forEach((topic, index) => {
            if (topic.slug == payload) {
                state.topics.splice(index,1);
            }
        })
    },
    setTopics: (state, payload) => state.topics = payload,
    setPosts: (state, payload) => state.posts = payload,
    addTopics: (state, payload) => state.topics = [...state.topics, ...payload],
    addPosts: (state, payload) => state.posts = [...state.posts, ...payload]
}
