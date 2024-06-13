<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTodoStore } from '../stores/todo';

const drawer = ref(false);
const todoStore = useTodoStore();
const router = useRouter();

function toggleDrawer() {
  drawer.value = !drawer.value;
}

function navigateHome() {
  router.push({ name: 'Home' });
}

// function logout() {
//   todoStore.logout();
//   router.push({ name: 'Login' });
// }

</script>

<template>
    <v-layout>
      <v-app-bar
        color="green-lighten-1"
        prominent
      >
        <v-app-bar-nav-icon 
          variant="text" 
          @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
      </v-navigation-drawer>

      <!-- <v-list-title>My files</v-list-title> -->

      <v-main>
       
      </v-main>
    </v-layout>
</template>

<style scoped>

</style>
