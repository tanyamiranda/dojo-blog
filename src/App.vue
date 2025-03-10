<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/add-post">Add Post</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding-top: 30px;
}

nav a {
  display: inline-block;
  text-decoration: none;
  margin: 0 10px;
  color: #999;
  font-size: 14px;
  text-transform: uppercase;
  color: #555;
  font-weight: bold;
}

nav a.router-link-exact-active {
  border-bottom: 2px solid green;
  padding-bottom: 4px;
}
</style>
