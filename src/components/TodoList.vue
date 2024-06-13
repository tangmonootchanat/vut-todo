<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useTodoStore } from '../stores/todo';
import type { Todo } from '../stores/todo';

const todoStore = useTodoStore();
const todoList = todoStore.todoList;

const name = ref('');
const searchQuery = ref('');
const isEditing = ref(false);
const editingIndex = ref<number | null>(null);

const todoData: Todo = reactive({
  id: 0,
  text: '',
  date: '',
  done: false,
});

function addOrUpdateTodo() {
  if (!name.value.trim()) {
    return;
  }

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

function onDeleteTodo(index: number) {
  todoStore.deleteTodo(index);
}

function toggleDone(todo: Todo) {
  const todoIndex = todoList.findIndex(t => t.id === todo.id);
  if (todoIndex !== -1) {
    todoStore.updateTodo(todoIndex, { ...todo, done: !todo.done });
  }
}

const filteredTodoList = computed(() => {
  if (!searchQuery.value) {
    return todoList;
  }
  return todoList.filter(todo => 
    todo.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="d-flex align-center mb-4">
          <v-text-field
            v-model="searchQuery"
            class="pa-4 mx-auto flex-grow-1"
            label="search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 350px;"
            variant="solo"
            hide-details
            rounded
            clearable
          ></v-text-field>

          <v-text-field
            v-model="name"
            class="pa-4 mr-4 flex-grow-1"
            label="Add/Edit Task"
            variant="solo"
            hide-details
            rounded
            clearable
          ></v-text-field>

          <div v-if="isEditing">
            <v-btn 
              @click="addOrUpdateTodo"
              color="orange-darken-1"
              variant="flat"
              class="mr-4"
              rounded
            >
              Update
            </v-btn>

            <v-btn 
              @click="resetForm"
              color="red-lighten-1"
              variant="flat"
              class="mr-4"
              rounded
            >
              Cancel
            </v-btn>
          </div>

          <v-btn 
            v-else
            @click="addOrUpdateTodo"
            color="green-lighten-1"
            variant="flat"
            class="mr-4"
            rounded
          >
            Add
          </v-btn>
        </div>

        <div v-if="filteredTodoList.length === 0" class="no-tasks">
          <v-icon color="primary" icon="mdi-check" size="100"></v-icon>
          <div class="text-h5 text-primary">not found.</div>
        </div>

        <v-list>
          <v-card color="blue-grey-lighten-5">
            <v-list-item v-for="(todo, index) in filteredTodoList" :key="todo.id">
              <template v-slot:prepend>
                <v-list-item-action>
                  <v-radio 
                    v-model="todo.done" 
                    @change="toggleDone(todo)" 
                  />
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
                    variant="text"
                  >
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-card>
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
  .mr-4 {
    margin-right: 16px;
  }
  .mb-4 {
    margin-bottom: 16px;
  }
  .no-tasks {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }
</style>
