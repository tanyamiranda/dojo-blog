<template>
  <div class="spinner" >
    <p>{{ text }}</p>
    <div class="spin" :class="{'small' : small, 'big': big}"></div>
  </div>
</template>

<script>
export default {
    props: ['text', 'small', 'big']
}
</script>

<style>
.spinner{
  margin: auto;
  text-align: center;
}
.spin {
  display: block;
  width: 40px;
  height: 40px;
  border : solid 3px transparent;
  border-radius: 50%;
  border-top-color: #ff8800;
  margin: auto;
  margin-top: 20px;
  animation: spin 1s ease infinite;
}

.small {
  width: 20px !important;
  height: 20px !important;
}

.big {
  width: 60px !important;
  height: 60px !important;
}

@keyframes spin {
    to {transform: rotateZ(360deg)}
}
</style>