<template>
  <div class="app">
    <aside>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/books">Books</router-link></li>
        <li><router-link to="/readers">Readers</router-link></li>
        <li><router-link to="/staffs">Staffs</router-link></li>
        <li><router-link to="/categories">Categories</router-link></li>
      </ul>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>
