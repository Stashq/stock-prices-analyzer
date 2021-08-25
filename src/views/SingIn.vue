<template>
  <div>
    <Navbar />
    <main>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <form id="Login" @submit="singIn">
            <div>
              <span class="input-description">First Name</span>
              <input
                required
                type="text"
                v-model="firstName"
                class="fadeIn first"
                name="firstName"
                placeholder="Joe"
              />
            </div>
            <div>
              <span class="input-description">Last Name</span>
              <input
                required
                type="text"
                v-model="lastName"
                class="fadeIn second"
                name="lastName"
                placeholder="Smith"
              />
            </div>
            <div>
              <span class="input-description">Email</span>
              <input
                required
                type="email"
                v-model="email"
                class="fadeIn third"
                name="email"
                placeholder="example@mail.com"
              />
            </div>
            <div>
              <span class="input-description">Username</span>
              <input
                required
                type="text"
                v-model="username"
                class="fadeIn fourth"
                name="username"
                placeholder="joe1984"
              />
            </div>
            <div>
              <span class="input-description">Password</span>
              <input
                required
                type="password"
                v-model="password"
                class="fadeIn fifth"
                name="password"
                placeholder="password"
              />
            </div>
            <div>
              <span class="input-description">Repeat password</span>
              <input
                required
                type="password"
                v-model="passwordAgain"
                class="fadeIn sixth"
                name="passwordAgain"
                placeholder="repeat password"
              />
            </div>
            <input type="submit" class="fadeIn fourth" value="Sing in" />
          </form>

          <p style="color: red" id="error-message" v-show="error_info">
            {{ error_info }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
  margin: 10px;
  padding: 10px;
  border: 2px solid #bdbdbd;
  border-radius: 10px;
  width: 40%;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 650px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

.input-description {
  display: inline-block;
  width: 15%;
  font-weight: 600;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 65%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder,
input[type="email"]:placeholder,
input[type="password"]:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

.fadeIn.fifth {
  -webkit-animation-delay: 1.2s;
  -moz-animation-delay: 1.2s;
  animation-delay: 1.2s;
}

.fadeIn.sixth {
  -webkit-animation-delay: 1.4s;
  -moz-animation-delay: 1.4s;
  animation-delay: 1.4s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #3b82a5;
  text-decoration: none;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}
</style>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Authentication",
  components: {
    Navbar: Navbar,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      passwordAgain: null,
      error_info: null,
    };
  },
  methods: {
    singIn: function (e) {
      e.preventDefault();

      if (this.password !== this.passwordAgain) {
        this.error_info = "Passwords are not the same.";
        return false;
      }
      const account_fields = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        username: this.username,
        password_hash: this.password,
      };
      this.$api
        .post("/users", account_fields)
        .then(() => {
          this.error_info = null;
          alert("Account has been created");
          this.$router.push("/login");
        })
        .catch((err) => {
          if (!err.response) {
            this.error_info = "Connection refused. Please, try later.";
          } else if (err.response.status >= 500) {
            this.error_info = "Internal server error. Please, try later.";
          } else if (err.response.status >= 400) {
            this.error_info = err.response.data["detail"];
          } else {
            this.error_info = null;
          }
        });
    },
  },
};
</script>
