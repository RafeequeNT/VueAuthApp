<template>
    <div class="posts">
        <div v-if="User">
          <p>Hi {{User}}</p>
        </div>
        <div>
            <form @submit.prevent="submit">
              <div>
                <label for="title">Title:</label>
                <input type="text" name="title" v-model="form.title">
              </div>
              <div>
                <label for="title">Author:</label>
                <input type="text" name="name" v-model="form.name"/>
              </div>
              <div>
                <textarea name="write_up" v-model="form.description" placeholder="Write up..."></textarea>
              </div> 
              
              <button :disabled='isDisabled' type="submit"> Submit</button>
            </form>
        </div>
        <div class="posts" v-if="Posts">
          <ul>
            <li v-for="post in Posts" :key="post.title">
              <div id="post-div">
                <p>{{post.title}}</p>
                <p>{{post.description}}</p>
                <p>Written By: {{post.name}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          Oh no!!! We have no posts
        </div>
    </div>
  </template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'PostView',
  components: {
    
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        name:''
      }
    };
  },
  created: function () {
    // a function to call getposts action
    this.GetPosts()
  },
  computed: {
    ...mapGetters({Posts: "StatePosts", User: "StateUser"}),
    isDisabled : function(){ return this.form.description===''||this.form.title==='' }
  },
  methods: {
    ...mapActions(["CreatePost", "GetPosts"]),
    async submit() {
      try {
        await this.CreatePost(this.form);
        this.form={
          title:'',
          description:'',
          name:''
        }
      } catch (error) {
        throw "Sorry you can't make a post now!"
      }
    },  
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius:30px;
  margin: 10px;
}
button[type=submit]:hover {
  background-color: #45a049;
}
input {
  width:60%;
  margin: 15px;
  border: 0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  padding:10px;
  border-radius:30px;
}
textarea {
  width:75%;
  resize: vertical;
  padding:15px;
  border-radius:15px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  height:150px;
  margin: 15px;
}
ul {
  list-style: none;
}
#post-div {
  border: 3px solid #000;
  width: 500px;
  margin: auto;
  margin-bottom: 5px;;
}
</style>
