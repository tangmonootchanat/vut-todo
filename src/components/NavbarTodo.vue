<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useTodoStore } from '../stores/todo';
import { useMockStore } from '../stores/useMockStore';

const drawer = ref(false);
const todoStore = useTodoStore();
const store = useMockStore();
const router = useRouter();

// Reactive variable to store user's display name
const userName = ref('');

// Watch for changes in isLoggedIn status and update userName accordingly
watchEffect(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
    userName.value = todoStore.currentUser?.username ?? '';
  } else {
    userName.value = '';
  }
});

function toggleDrawer() {
  drawer.value = !drawer.value;
}

function navigateHome() {
  router.push({ name: 'Home' });
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  router.push({ name: 'LoginView' });
}

// function logout() {
//   todoStore.logout();
//   router.push({ name: 'Login' });
// }

</script>

<template>
  <v-layout class="mb-4">
    <v-app-bar
      color="green-lighten-1"
      prominent
    >
      <v-app-bar-nav-icon 
        variant="text" 
        @click.stop="toggleDrawer">
      </v-app-bar-nav-icon>

      <v-toolbar-title v-if="userName">Name : {{ userName }}</v-toolbar-title>
      <v-toolbar-title v-else>My files</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
    </v-app-bar>
    
    <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <!-- เพิ่มเมนูหรือลิงก์สำหรับ Logout ที่นี่ -->
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-navigation-drawer>

    <v-main>
     
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
