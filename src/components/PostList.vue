<template>
  <div id="post-list">
    <h3 id="post-list-title">{{ listName }}</h3>
    <div v-for="post in posts" :key="post.id">
        <SinglePost :post="post" class="single-post"/>
    </div>
  </div>
</template>

<script>
import SinglePost from './SinglePost.vue';
export default {
  name: "PostList",
  components: {SinglePost},
  props: ['posts', 'listName']
}
</script>

<style>

</style>