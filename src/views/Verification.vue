<template>
  <div>
    <h1>{{ response }}</h1>
    <a href="/login">Go to login page</a>
  </div>
</template>

<style lang="scss" scoped>
h1 {
    color: white;
}
</style>

<script>
export default {
  name: "Verification",
  data() {
    return {
      response: null,
    };
  },
  created: function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("user_id");
    const registrationCode = urlParams.get("registration_code");
    this.$api
      .put(
        "/users/" + userId.toString(),
        {},
        {
          params: { registration_code: registrationCode },
        }
      )
      .then(() => {
        this.response = "Your account has been registered successful.";
      })
      .catch((err) => {
        console.log(err.response);
        this.response =
          "Registration code not fount. Probably your account has been already registered.";
      });
  },
};
</script>
