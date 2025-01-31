import { createStore } from 'vuex';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export default createStore({
  state: {
    user: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    getUserName: (state) => state.user.displayName,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
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
        commit('SET_USER', user);
        return user;
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit('CLEAR_USER');
    },
    fetchUser({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit('SET_USER', user);
        } else {
          commit('CLEAR_USER');
        }
      });
    },
  },
});
