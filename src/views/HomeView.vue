<template>
  <div class="home">
    <div v-if="error">
      <h3>Error Loading Data</h3>
      <div class="error-message">Error Message: {{ error }}</div>
    </div>
    <div v-if="posts.length">
      <PostList :posts="filterPostsByTag" :listName="listTitle"/>
    </div>
    <div v-else> 
      <Spinner text="Loading . . ."/>
    </div>
  </div>
</template>

<script>
import {ref, watch, computed} from 'vue';
import PostList from '@/components/PostList.vue';
import { fetchAllPosts } from '@/composables/loadData';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'HomeView',
  components: {PostList, Spinner},
  props: ['tag'],
  setup(props) {
    
    const listTitle = ref("All Posts")
    const {data, error, load} = fetchAllPosts()
    
    load()

    const posts = ref(data)

    watch(posts, async(newPosts, oldPosts) => {
      posts.value = newPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Sort in descending order
      });
    })

    const filterPostsByTag = computed(() => {
      const filterTag = props.tag
      if (filterTag != "") {
        listTitle.value = "Posts Filtered by Tag: " + filterTag.toUpperCase()
        return posts.value.filter((singlePost) => singlePost.tags.some((aTag) => aTag.toLowerCase() == filterTag.toLowerCase()))
      }
      else {
        listTitle.value = "All Posts"
        return posts.value
      }
    })

    return {posts, error, listTitle, filterPostsByTag}
  }

}
</script>
<style>
body {
  background-color: #f2f2f2;
}

.error-message {
  font-size: 12px;
}

#post-list {
  display: inline-block;
  max-width: 700px;
  width: 100%;
}

#post-list-title {
  text-wrap-style: pretty;
  line-height: 2;
}

.single-post {
  text-align:left;
  display: inline-block;
  max-width: 600px;
  padding: 10px;
  background: white;
  border: silver 1px solid;
  border-radius: 10px;
  margin-top: 10px;
}

.post-body {
  white-space: break-spaces;
  color: rgb(46, 45, 45)
}

.post-footer {
  border-top: 1px silver solid;
  padding-top: 10px;
  margin-top: 10px;
  line-height: 1.5;
  color: gray;
}

.all-tags, .post-date, .more-link{
  font-size: 11px;
  font-style: italic;
  text-transform: uppercase;
  font-weight: bold;
}

.tag-link{
  color: darkblue;
}

.more-link {
  color: green;
}

.post-title {
  text-decoration: none;
  color: green;
  font-style: italic;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0;
  display: inline-block;
}

.post-title a:visited, .post-title a:hover, .post-title a:link {
  text-decoration: inherit;
  color: inherit;
}

</style>