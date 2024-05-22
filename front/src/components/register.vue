<template>
    <div class="wrapper">
    <div class="registration-box">
      <h2>Registro</h2> 
      <form @submit.prevent="submitForm">
        <div class="input-box">
          <input type="text" placeholder="Alias" v-model="name" required>
        </div>
        <div class="input-box">
          <input type="text" placeholder="e-mail de contacto" v-model="email" required>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Contraseña" v-model="password" required>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Confirme la contraseña" v-model="confirmPassword" required>
        </div>
        <div class="policy">
          <input type="checkbox" v-model="acceptedTerms">
          <label>Acepto términos y condiciones</label>
        </div>
        <div class="input-box button">
          <button type="submit">Registrar ahora</button>
        </div>
        <div class="text">
          <h3>¿Ya hace parte del descontrol? <router-link to="/">Login now</router-link></h3>
        </div>
      </form>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false
      };
    },
    methods: {
      submitForm() {
        // Perform form submission logic here
        console.log('Form submitted!');
      }
    }
  };
  </script>
  
  <style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image: url('https://www.roomforzoom.com/backgrounds/John-Wick-2-Sci-fi-room-77.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Background color with opacity */
}

.registration-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px; /* Adjust as needed */
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.registration-box h2 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}


.wrapper form {
  margin-top: 30px;
  width: 100%;
  max-width: 430px;
  padding: 34px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.wrapper form .input-box {
  height: 52px;
  margin: 18px 0;
}

form .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  padding: 0 15px;
  font-size: 17px;
  font-weight: 400;
  color: #333;
  border: 1.5px solid #C7BEBE;
  border-bottom-width: 2.5px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.input-box input:focus,
.input-box input:valid {
  border-color: #4070f4;
}

form .policy {
  display: flex;
  align-items: center;
}

form h3 {
  color: #707070;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}

.input-box.button input {
  color: #fff;
  letter-spacing: 1px;
  border: none;
  background: #4070f4;
  cursor: pointer;
}

.input-box.button input:hover {
  background: #0e4bf1;
}

form .text h3 {
  color: #333;
  width: 100%;
  text-align: center;
}

form .text h3 a {
  color: #4070f4;
  text-decoration: none;
}

form .text h3 a:hover {
  text-decoration: underline;
}
  
  /* Background image specific to this component */
  
  </style>