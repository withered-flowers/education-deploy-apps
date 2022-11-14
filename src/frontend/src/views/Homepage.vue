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

<script>
export default {
  data() {
    return {
      secretData: "",
      tableData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const endpoint = this.$baseEndpoint + "/";

        let response = await fetch(endpoint);
        let responseData = await response.json();

        if (response.status !== 200) {
          throw responseData;
        } else {
          this.secretData = responseData.message.secret;
          this.tableData = responseData.message.data;
        }
      } catch (err) {
        // In real case, NEVER USE ALERT !
        alert("Something wicked happened");
      }
    },
    getFullName(obj) {
      return obj.first_name + " " + obj.last_name;
    },
  },
  computed: {
    computedSecret: function () {
      return this.secretData;
    },
    computedTableData: function () {
      return this.tableData;
    },
  },
};
</script>

<style scoped></style>
