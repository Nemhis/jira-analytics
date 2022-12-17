<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <v-btn @click="login" color="primary">{{ $utils.string.plural(1, 'один', 'два', 'пять') }}</v-btn>
  </div>
</template>

<script lang="ts" src="./Login.ts" />
