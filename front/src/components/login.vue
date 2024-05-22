<template>
    <div class="container-fluid">
      <div class="row no-gutter">
        <!-- The image half -->
        <div class="col-md-6 d-none d-md-flex bg-image"></div>
  
        <!-- The content half -->
        <div class="col-md-6 bg-light">
          <div class="login d-flex align-items-center py-5">
            <!-- Demo content-->
            <div class="container">
              <div class="row">
                <div class="col-lg-10 col-xl-7 mx-auto">
                  <h3 class="display-4">No Leer</h3>
                  <p class="text-muted mb-4">Entre al crimen desorganizado</p>
                  <form @submit.prevent="submitForm">
                    <div class="form-group mb-3">
                      <input v-model="user" type="text" placeholder="Secret user" class="form-control rounded-pill border-0 shadow-sm px-4">
                    </div>
                    <div class="form-group mb-3">
                      <input v-model="password" type="password" placeholder="Super secret password" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary">
                    </div>
                    <div class="custom-control custom-checkbox mb-3">
                      <input id="customCheck1" type="checkbox" checked class="custom-control-input">
                      <label for="customCheck1" class="custom-control-label">Mostrar contraseña</label>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Entrar</button>
                    <div class="text-center mt-4">
                      <div>
                        ¿Nuevo usuario? <router-link to="/register">Registrarse</router-link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div><!-- End -->
          </div>
          <div class="powered-by">
            <p>Powered by 
              <a href="https://scp-wiki.wikidot.com/" class="font-italic text-muted" target="_blank">
                <u>SCP Foundation</u>
              </a>
            </p>
          </div>
        </div><!-- End -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: '',
        password: ''
      };
    },
    methods: {
      submitForm() {
        // Handle form submission logic here
        console.log('Form submitted!');
      }
    }
  };
  </script>
  
  <style scoped>
  .login,
  .image {
    min-height: 100vh;
  }
  
  .bg-image {
    background-image: url("https://virtual-bg.com/wp-content/uploads/2020/06/john-wick-3-image.jpg");
    background-size: cover;
    background-position: center center;
  }
  
  .powered-by {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #777;
  }
  </style>
  