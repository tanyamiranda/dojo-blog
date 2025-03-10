<template>
  <div>
    <div class="spinner"> 
      <Spinner text="Big Spinner Loading..." :big="true"/>
    </div>
    <p></p>
    <div class="spinner"> 
      <Spinner text="Small Spinner Loading..." :small="true"/>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
export default {
    components: {Spinner}
}
</script>

<style>
.spinner {
    width: 100%;
    margin: auto;
    display:block;
}
</style>