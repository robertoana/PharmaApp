import { createStore } from 'vuex';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default createStore({
  state: {
    user: null,
    token: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    getUserName: (state) => state.user.displayName,
    getToken: (state) => state.token,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    CLEAR_USER(state) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        commit('SET_USER', user);
        commit('SET_TOKEN', token);
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit('CLEAR_USER');
    },
  },
});
