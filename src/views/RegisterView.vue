<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { users } from '../stores/useMockStore'


// Import or define mock users data
const users = [
  { username: 'มีนา', password: '123456' },
  { username: 'รานี', password: '111111' },
  { username: 'วาสนา', password: '414141' },
];

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const visiblePassword = ref(false);
const visibleConfirmPassword = ref(false);
const loading = ref(false);
const error = ref<string | null>(null);
const router = useRouter();

function onRegister() {
  loading.value = true;
  error.value = null;

   // Mock data validation
  const user = users.find(u => u.username === username.value && u.password === password.value);
  if (!user) {
    error.value = 'Invalid login credentials';
    loading.value = false;
    return;
  }

  localStorage.setItem('isLoggedIn', 'true');
  router.push('/');
  loading.value = false;
}
</script>

<template>
  <v-container class="justify-center align-center" fill-height >
    <v-card class="mx-auto px-6 py-8 mt-12" max-width="450" color="grey-lighten-5">
      <div class="center-container">
        <div class="text-h5 text-md-h5 text-lg-h4 mb-2">
          Register
        </div>
      </div>
      <v-form @submit.prevent="onRegister">
        <v-text-field
          v-model="username"
          label="Username"
          type="text"
          :readonly="loading"
          :rules="[v => !!v || 'Username is required']"
          class="mb-2"
          placeholder="Enter your Username"
          variant="solo"
          rounded
          required
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          :type="visiblePassword ? 'text' : 'password'"
          placeholder="Enter your password"
          variant="solo"
          class="mb-2"
          :readonly="loading"
          :rules="[v => !!v || 'Password is required']"
          :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visiblePassword = !visiblePassword"
          density="compact"
          rounded
          required
          clearable
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          :type="visibleConfirmPassword ? 'text' : 'password'"
          placeholder="Confirm your password"
          variant="solo"
          class="mb-2"
          :readonly="loading"
          :rules="[v => !!v || 'Password confirmation is required']"
          :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visibleConfirmPassword = !visibleConfirmPassword"
          density="compact"
          rounded
          required
          clearable
        ></v-text-field>

        <div class="button-container">
          <v-btn
            :disabled="!username || !password || !confirmPassword || loading"
            :loading="loading"
            color="green-lighten-1"
            type="submit"
            variant="elevated"
            rounded
            block
          >
            submit
          </v-btn>
        </div>
        <v-alert v-if="error" type="error" dismissible>
          {{ error }}
        </v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>


<style scoped>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }

  .button-container {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center;
    max-width: 150px; /* Set the max-width to control the width of the button container */
    margin: 0 auto; /* Center the button container itself */
  }
</style>


