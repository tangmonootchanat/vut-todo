<!-- <script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useTodoStore } from '../stores/todo';

interface Todo {
  id: number;
  text: string;
  date: string;
  done: boolean;
}

const todoStore = useTodoStore();
const name = ref('');
const todoData: Todo = reactive({
  id: 0,
  text: '',
  date: '',
  done: false,
});

const createTodoRef = ref<HTMLDivElement | null>(null); // Adjust the type here

function addTodo() {
  if (todoData.text && todoData.date) {
    todoData.id = todoStore.todoList.length > 0 ? todoStore.todoList[todoStore.todoList.length - 1].id + 1 : 1;
    todoStore.addTodo(todoData);
    resetForm();
  }
}

function editTodo(todo: Todo, index: number) {
  todoData.id = todo.id;
  todoData.text = todo.text;
  todoData.date = todo.date;
  todoData.done = todo.done;
}

function resetForm() {
  todoData.id = 0;
  todoData.text = '';
  todoData.date = '';
  todoData.done = false;
  name.value = '';
}

watch(name, (newValue) => {
  todoData.text = newValue;
});
</script>

<template v-slot:append>
  <v-text-field 
    v-model="name" 
    label="Add Todo"
    hide-details
    clearable
    >
    <v-list-item-action>
      <v-btn 
        class="pa-4"
        color="primary-lighten-1"
        @click="addTodo"
        icon="mdi-plus"
        hide-details
        clearable
      >
      </v-btn>
    </v-list-item-action>
  </v-text-field>
</template>

<style scoped>
.v-text-field {
  width: 70vw; 
}
</style>
 -->
