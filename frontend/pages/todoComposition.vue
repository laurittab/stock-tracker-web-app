<template>
  <h3>My To Do List</h3>
  <div>
    <input v-model="newItemText" v-on:keyup.enter="addNewTodo" />
    <button v-on:click="addNewTodo">Add</button>
    <button v-on:click="removeTodo">Remove</button>
    <button v-on:click="removeAllTodos">Remove All</button>
    <transition-group name="list" tag="ul">
      <li v-for="task in tasks" v-bind:key="task">{{ task }}</li>
    </transition-group>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const tasks = ref([
      "Write my posts",
      "Go for a walk",
      "Meet my friends",
      "Buy fruit",
    ]);
    const newItemText = ref("");

    function addNewTodo() {
      if (newItemText.value != "") {
        tasks.value.unshift(newItemText.value);
      }
      newItemText.value = "";
    }
    function removeTodo() {
      tasks.value.pop();
    }
    function removeAllTodos() {
      tasks.value = [];
    }

    return {
      tasks,
      newItemText,
      addNewTodo,
      removeTodo,
      removeAllTodos,
    };
  },
};
</script>

<style>
button {
  margin: 5px;
}

ul {
  margin: 30px 0 0 0;
  padding: 0;
  text-align: left;
}

li {
  font-size: 1.2em;
  list-style: none;
}

.list-enter-active {
  animation: add-item 1s;
}

.list-leave-active {
  position: absolute;
  animation: add-item 1s reverse;
}

.list-move {
  transition: transform 1s;
}

@keyframes add-item {
  0% {
    opacity: 0;
    transform: translateX(150px);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-10px) skewX(20deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
