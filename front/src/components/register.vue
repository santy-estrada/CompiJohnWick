<template>
  <div class="wrapper">
    <div class="registration-box">
      <h2>Registro</h2>
      <form @submit.prevent="submitForm">
        <div class="input-box">
          <input type="text" placeholder="Alias" v-model="username" required>
        </div>
        <div class="input-box">
          <select v-model="role" required>
            <option disabled value="">Select Role</option>
            <option>AltaMesa</option>
            <option>LiderDeRegion</option>
            <option>Asesino</option>
            <option>Adjudicador</option>
          </select>
        </div>
        <div v-if="role === 'LiderDeRegion'" class="input-box">
          <select v-model="region" required>
            <option disabled value="">Select Region</option>
            <option>New York</option>
            <option>Tokyo</option>
            <option>Medallo City</option>
            <option>France</option>
            <option>England</option>
            <option>Rest of Europe</option>
            <option>Rest of the world other than Europe</option>
          </select>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Contraseña" v-model="password" required>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Confirme la contraseña" v-model="confirmPassword" required>
        </div>
        <div class="input-box button">
          <button type="submit" class="btn btn-primary">Registrar ahora</button>
        </div>
        <div class="text">
          <h3>¿Ya hace parte del descontrol? <router-link to="/login">Login now</router-link></h3>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      role: '',
      region: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async submitForm() {
      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      const formData = {
        username: this.username,
        role: this.role,
        password: this.password
      };

      if(this.role === 'LiderDeRegion') {
        formData.region = this.region;
      }

      try{
        const response = await axios.post('http://localhost:2023/user/register', formData);
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.$router.push('/');
        alert("La buena, ya estas registrado");
          
      } catch (error) {
        alert(error.message);
        return;
      }
      
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
  font-family: 'Arial', sans-serif; /* Consistent font */
}

.registration-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
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
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.wrapper form .input-box {
  margin: 18px 0;
}

form .input-box input,
form .input-box select {
  height: 52px;
  width: 100%;
  outline: none;
  padding: 0 15px;
  font-size: 17px;
  font-weight: 400;
  color: #333;
  border: 1.5px solid #C7BEBE;
  border-bottom-width: 2.5px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.input-box input:focus,
.input-box input:valid,
.input-box select:focus,
.input-box select:valid {
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

.input-box.button input,
.input-box.button .btn-primary {
  height: 52px;
  width: 100%;
  color: #fff;
  letter-spacing: 1px;
  border: none;
  background: #4070f4;
  cursor: pointer;
  padding: 0 15px;
  border-radius: 8px;
  font-size: 17px;
  font-weight: 400;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
}

.input-box.button input:hover,
.input-box.button .btn-primary:hover {
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
</style>
