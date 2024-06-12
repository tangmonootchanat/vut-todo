<!-- src/components/TodoList.vue -->
<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useTodoStore } from '../stores/todo';
import type { Todo } from '../stores/todo';

const todoStore = useTodoStore();
const todoList = todoStore.todoList;

// interface Todo {
//     id: number;
//     text: string;
//     date: string;
//     done: boolean;
//   }

  const name = ref('');
  // const isLogin = ref(false);
  const isEditing = ref(false);
  const editingIndex = ref<number | null>(null);

  const todoData: Todo = reactive({
    id: 0,
    text: '',
    date: '',
    done: false,
  });

//   function addTodo() {
//   if (todoData.text && todoData.date) {
//     todoData.id = todoStore.todoList.length > 0 ? todoStore.todoList[todoStore.todoList.length - 1].id + 1 : 1;
//     todoStore.addTodo(todoData);
//     resetForm();
//   }
// }

function addOrUpdateTodo() {
  if (isEditing.value && editingIndex.value !== null) {
    updateTodo();
  } else {
    addNewTodo();
  }
}

function addNewTodo() {
  const newTodo: Todo = {
    id: todoStore.todoList.length ? todoStore.todoList[todoStore.todoList.length - 1].id + 1 : 1,
    text: name.value,
    date: new Date().toLocaleDateString('th-TH'),
    done: false
  };
  todoStore.addTodo(newTodo);
  resetForm();
}

function updateTodo() {
  if (isEditing.value && editingIndex.value !== null) {
    const updatedTodo: Todo = {
      id: todoData.id,
      text: name.value,
      date: todoData.date,
      done: todoData.done,
    };
    todoStore.updateTodo(editingIndex.value, updatedTodo);
    resetForm();
  }
}


function resetForm() {
    todoData.id = 0;
    todoData.text = '';
    todoData.date = '';
    todoData.done = false;
    name.value = '';
    isEditing.value = false;
    editingIndex.value = null;
}

function editTodo(todo: Todo, index: number) {
  todoData.id = todo.id;
  todoData.text = todo.text;
  todoData.date = todo.date;
  todoData.done = todo.done;
  name.value = todo.text;
  isEditing.value = true;
  editingIndex.value = index;
}


// watch(name, (newValue) => {
  //   todoData.text = newValue;
  // });

function onDeleteTodo(index: number) {
  todoStore.deleteTodo(index);
}



function toggleDone(todo: Todo) {
  const todoIndex = todoList.findIndex(t => t.id === todo.id);
  if (todoIndex !== -1) {
    todoStore.updateTodo(todoIndex, { ...todo, done: !todo.done });
  }
}

// function toggleDone(todo: Todo) {
//   todoStore.updateTodo(todo);
// }
</script>


<template>
  <!-- ! คล้ายๆเป็นการสลับค่า  -->
  <!-- <h1 v-if="!isLogin">Logout!</h1>
  <h1 v-else>isLogin 😢</h1> -->
  <v-app>
    <v-main>
      <v-container>
        <v-text-field
          v-model="name"
          class="pa-4"
          append-inner-icon="mdi-plus"
          label="Add/Edit Task"
          hide-details
          clearable
        ></v-text-field>
        <v-btn 
          @click="addOrUpdateTodo"
          :color="isEditing ? 'orange' : 'primary'"
          variant="flat"
          >
          {{ isEditing ? 'Update' : 'Add' }}
        </v-btn>
        <v-list>
          <!-- ใช้ v-for เพื่อเป็นการวนลูปข้อมูล ใน todoList -->
          <v-list-item v-for="(todo, index) in todoList" :key="todo.id">
            <template v-slot:prepend>
              <v-list-item-action>
                <v-checkbox v-model="todo.done" @change="toggleDone(todo)" />
              </v-list-item-action>
            </template>

            <v-list-item-content>
              <v-list-item-title>
                <span :class="{ 'text-decoration-line-through': todo.done }">{{ todo.text }} - {{ todo.date }}</span>
              </v-list-item-title>
            </v-list-item-content>

            <template v-slot:append>
              <v-list-item-action>
                <v-btn 
                  @click="() => editTodo(todo, index)"
                  color="orange-lighten-2"
                  icon="mdi-pencil" 
                  variant="text"
                  >
                </v-btn>
                <v-btn 
                  @click="onDeleteTodo(index)"
                  icon="mdi-delete"
                  color="red-lighten-1"
                  variant="text">
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped>
  .text-decoration-line-through {
  text-decoration: line-through;
  }
  .d-flex {
    display: flex;
  }
  .align-center {
    align-items: center;
  }
  .flex-grow-1 {
    flex-grow: 1;
  }
</style>
