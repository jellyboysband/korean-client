import setState from '@/common/lib/setState'
import api from '@/common/blog/api'


const store = {
  namespaced: true,

  state: {
    CategoryList: [],
    PostList: [],
  },

  getters: {
    GetCategory: ({ CategoryList }) => (categoryId) => CategoryList.find((it) => it.id === categoryId),
    GetPost: ({ PostList }) => (postId) => PostList.find((it) => it.id === postId),
  },

  mutations: {
    SetCategoryList: setState('CategoryList'),
    SetPostList: setState('PostList'),
  },

  actions: {
    async LoadCategoryList({ commit }) {
      const data = await api.getCategoryList()
      commit('SetCategoryList', Object.freeze(data))
    },

    async LoadPostList({ commit }) {
      const data = await api.getPostList()
      commit('SetPostList', Object.freeze(data))
    },
  },
}

export default store
