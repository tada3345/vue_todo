<script setup>
import { ref, onMounted, computed, watch } from 'vue';

import Swal from 'sweetalert2';

const todos = ref([]);
const name = ref('');
const input_content = ref('');
const input_category = ref(null);

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

watch(name, (newVal) => {
  localStorage.setItem('name', newVal);
});

watch(
  todos,
  (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal));
  },
  { deep: true }
);

const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    Swal.fire({
      title: '入力内容を確認してください',
      text: 'タスクの入力とカテゴリーの選択をお願いします。',
      icon: 'error',
      confirmButtonText: '確認する',
    });
  }
  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().toISOString(),
  });
  input_content.value = '';
  input_category.value = null;
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

onMounted(() => {
  name.value = localStorage.getItem('name') || '';
  todos.value = JSON.parse(localStorage.getItem('todos')) || [];
});
</script>

<template>
  <main class="app">
    <h1>
      <v-icon scale="3" animation="float" name="px-checkbox" /> Vue Todoアプリ
    </h1>
    <section class="greeting">
      <h2 class="title">
        あなたの名前 :
        <input
          type="text"
          placeholder="(名前を入力してください)"
          v-model="name"
        />
      </h2>
    </section>
    <section class="create-todo">
      <h3>新規追加</h3>
      <form @submit.prevent="addTodo">
        <h4>新しい項目を追加してください</h4>
        <input
          type="text"
          placeholder="例): Vue.jsを勉強する"
          v-model="input_content"
        />
        <h4>カテゴリーを選んでください</h4>
        <div class="options">
          <label for="business">
            <input
              id="business"
              type="radio"
              name="category"
              value="business"
              v-model="input_category"
            />
            <span class="bubble business"></span>
            <FaLaptop />
            <v-icon
              scale="3"
              animation="float"
              speed="slow"
              class="business"
              name="px-briefcase-account"
            />

            <div>お仕事</div>
          </label>
          <label for="personal">
            <input
              id="personal"
              type="radio"
              name="category"
              value="personal"
              v-model="input_category"
            />
            <span class="bubble personal"></span>
            <v-icon
              scale="3"
              animation="float"
              speed="slow"
              class="personal"
              name="px-home"
            />
            <div>プライベート</div>
          </label>
        </div>
        <input type="submit" value="新規追加 ✓" />
      </form>
    </section>

    <section v-if="todos.length > 0" class="todo-list">
      <h3>Todo リスト</h3>
      <div class="list">
        <div
          v-for="todo in todos_asc"
          :key="todo.createdAt"
          :class="`todo-item ${todo.done && 'done'}`"
        >
          <label :for="todo.createdAt">
            <input :id="todo.createdAt" type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.category}`"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">
              <v-icon name="px-trash"></v-icon> 削除する
            </button>
          </div>
        </div>
      </div>
    </section>
    <section v-else>タスクの入力はありません</section>
  </main>
</template>
