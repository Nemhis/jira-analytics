<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <button @click="login">try to login</button>
    {{ $utils.string.plural(1, 'один', 'два', 'пять') }}
  </div>
</template>

<script lang="ts" src="./Login.ts" />
