<!-- src/views/TodoView.vue -->
<script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
  import { useTodoStore } from '../stores/todo';
  import NavbarTodo from "@/components/NavbarTodo.vue";
  import TodoList from "@/components/TodoList.vue"; // Import the TodoList component

  interface Todo {
    id: number;
    text: string;
    date: string;
    done: boolean;
  }

  const todoStore = useTodoStore();
 

  
  // function editTodo(todo: Todo, index: number) {
  //   todoData.id = todo.id;
  //   todoData.text = todo.text;
  //   todoData.date = todo.date;
  //   todoData.done = todo.done;
  // }


//ที่มันยังอัพค่าตามได้เพราะ  v-model ที่ผูกกับ name v-model คือ binding แบบสองทาง (two-way binding) ซึ่งหมายความว่าค่าในตัวแปร name จะถูกอัพเดตโดยอัตโนมัติเมื่อผู้ใช้พิมพ์ในช่อง input และช่อง input จะถูกอัพเดตเมื่อค่าใน name 
// watch จะตรวจสอบการเปลี่ยนแปลงของ name และเมื่อ name เปลี่ยน ค่า todoData.text จะถูกอัพเดตให้ตรงกับค่า name ที่เปลี่ยน
// เมื่อผู้ใช้พิมพ์ในช่อง input, ค่า name จะถูกอัพเดตและเนื่องจาก watch คอยตรวจสอบการเปลี่ยนแปลงของ name, ค่า todoData.text ก็จะถูกอัพเดตด้วย.
  
</script>

<template>
  <NavbarTodo />
  <!-- <v-app>
    <v-main> -->
        <TodoList />
    <!-- </v-main>
  </v-app> -->
</template>



<style scoped>
  .v-text-field {
    width: 100vh; 
  }

  .v-btn {
    margin-left: auto;
  }
</style>
