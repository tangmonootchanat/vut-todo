import { defineStore } from "pinia";

interface Todo {
  id: number;
  text: string;
  date: string;
  done: boolean;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    count: 0,
    name: 'Eduardo',
    todoList: [
      {
        id: 1,
        text: 'นัดกินข้าวกับเพื่อน',
        date: '7/6/2567',
        done: false
      },
      {
        id: 2,
        text: 'ไปเที่ยวทะเล',
        date: '9/6/2567',
        done: false
      },
      {
        id: 3,
        text: 'ซื้อของเข้าห้องตอนเช้า',
        date: '11/6/2567',
        done: false
      }
    ] as Todo[]
  }),
  getters: {
    doubleCount: (state) => state.count * 2, 
  },
  actions: {
    addTodo(todo: Todo) {
      this.todoList.push(todo);
    },
    deleteTodo(index: number) {
      if (index >= 0 && index < this.todoList.length) {
        this.todoList.splice(index, 1);
      } else {
        console.error('Index out of bounds');
      }
    },
    updateTodo(index: number, updatedTodo: Todo) {
      if (index >= 0 && index < this.todoList.length) {
        this.todoList[index] = updatedTodo;
      } else {
        console.error('Index out of bounds');
      }
    }
  },
});
