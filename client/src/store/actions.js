export default {
    login: ({commit}, payload) => commit('login', payload),
    logout: ({commit}) => commit('logout'),
    deletePost: ({commit}, payload) => commit('deletePost', payload),
    deleteTopic: ({commit}, payload) => commit('deleteTopic', payload),
    setPosts: ({commit}, payload) => commit('setPosts', payload),
    setTopics: ({commit}, payload) => commit('setTopics', payload),
    addPosts: ({commit}, payload) => commit('addPosts', payload),
    addTopics: ({commit}, payload) => commit('addTopics', payload),
}
