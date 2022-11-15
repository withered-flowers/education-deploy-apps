<script setup>
import { onMounted, ref, computed } from "vue";
// TODO: Import inject from vue
import { inject } from "vue";

// TODO: use inject to get global variable from provide
const baseUrl = inject("baseUrl");

const secretData = ref("");
const tableData = ref([]);

const fetchData = async () => {
  try {
    const endpoint = baseUrl + "/";

    let response = await fetch(endpoint);
    let responseData = await response.json();

    if (response.status !== 200) {
      throw responseData;
    } else {
      secretData.value = responseData.message.secret;
      tableData.value = responseData.message.data;
    }
  } catch (err) {
    // In real case, NEVER USE ALERT !
    alert("Something wicked happened");
  }
};

const getFullName = (obj) => {
  return obj.first_name + " " + obj.last_name;
};

const computedTableData = computed(() => tableData.value);

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="flex flex-col items-center mx-auto">
    <p class="pt-4 pb-4 text-gray-100 hover:text-gray-500">
      Secret Code: {{ secretData }}
    </p>
    <table class="table-auto">
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>E-Mail</th>
          <th>DOB</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in computedTableData" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ getFullName(user) }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.dob }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
