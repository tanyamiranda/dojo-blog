<template>
  <div>
    <router-link class="post-title" :to="{name: 'EditPostView', params:{id: post.id}}">{{ post.title }}</router-link>
    <div>
      <div v-if="displayMoreLink" @click="toggleDisplayFullPost()">
        <span class="post-body">{{ post.body.substring(0,100) }} ...</span>
        <span class="more-link"> (show more)</span>
      </div>
      <div v-else @click="toggleDisplayFullPost()"> 
        <span class="post-body">{{ post.body }}</span>
        <span class="more-link"> (show less)</span>
      </div>
    </div>
    <div class="post-footer">
      <div class="post-date"><span>Created: {{ post.date }}</span></div>
      <div class="all-tags"> TAGS:
        <span v-for="tag in post.tags" :key="tag">
          <span >
            <router-link :to="{name: 'filterHome', params:{tag: tag}}" class="tag-link">{{tag}}</router-link>&nbsp;
          </span>
        </span> 
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  props: ['post'],
  setup(props) {
    const displayMoreLink = ref(true)

    const toggleDisplayFullPost = () => {
      displayMoreLink.value = !displayMoreLink.value
    }
    
    return {displayMoreLink,toggleDisplayFullPost}
  }
}
</script>

<style>

</style>