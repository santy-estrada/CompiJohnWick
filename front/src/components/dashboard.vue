<template>
  <div class="wrapper">
    <div class="top-right-buttons">
      <button @click="goToRegister" class="top-button">Register</button>
      <button @click="goToLogin" class="top-button">Login</button>
    </div>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <button @click="showRules" class="dashboard-button">Rules</button>
      <button @click="showMissions" class="dashboard-button">Missions</button>
      <button @click="showConflicts" class="dashboard-button">Conflicts</button>
      <button @click="showSanctions" class="dashboard-button">Sanctions</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async isLogged() {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        };
        const response = await axios.get('http://localhost:2023/user/validate-token', config);
        const data = response.data;
        if (data.isValid) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error:', error);
        return false;
      }
    },
    async showRules() {
      
      this.$router.push('/rules');
     
    },
    async showMissions() {
      
      this.$router.push('/missions');
      
    },
    async showConflicts() {
      if (await this.isLogged()) {
        console.log('Showing conflicts');
        this.$router.push('/conflicts');
      } else {
        alert("Dummy dumb dumb, you need to login first");
        this.$router.push('/login');
      }
    },
    async showSanctions() {
      if (await this.isLogged()) {
        console.log('Showing sanctions');
        this.$router.push('/sanctions');
      } else {
        alert("Dummy dumb dumb, you need to login first");
        this.$router.push('/login');
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToLogin() {
      this.$router.push('/login');
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

.top-right-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.top-button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4070f4;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.top-button:hover {
  background-color: #0e4bf1;
}

.dashboard {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 55vh;
  width: 25vw;
}

.dashboard h1 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.dashboard-button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4070f4;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 200px;
}

.dashboard-button:hover {
  background-color: #0e4bf1;
}
</style>
