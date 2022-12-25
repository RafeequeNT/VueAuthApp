//store/modules/auth.js

import { getHeaderInfo } from "@/helpers/isAuthenticated";
import axios from "axios";
const state = {
  user: null,
  posts: null,
};
const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
};
const actions = {
  async Register({ dispatch }, form) {
    await axios.post("register", JSON);
    // let UserForm = new FormData()
    // UserForm.append('username', form.username)
    // UserForm.append('password', form.password)
    await dispatch("LogIn", {
      username: form.username,
      password: form.password,
    });
  },
  async LogIn({ commit }, User) {
    const res = await axios.post("authenticate", User);

    localStorage.setItem("token", res.data.token);

   

    await commit("setUser", User?.username);
  },
  async CreatePost({ dispatch }, post) {
  const header = await getHeaderInfo();

    await axios.post("/create", post,header);
    await dispatch("GetPosts");
  },
  async GetPosts({ commit }) {
  const header = await getHeaderInfo();

    let response = await axios.get("/posts",header);
   
    commit("setPosts", response.data);
  },
  async LogOut({ commit }) {
    let user = null;
    
    commit("LogOut", user);
    


  },
};
const mutations = {
  setUser(state, username) {
    state.user = username;
  },
  setPosts(state, posts) {
    state.posts = posts;
  },
  LogOut(state) {
    state.user = null;
    state.posts = null;
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
