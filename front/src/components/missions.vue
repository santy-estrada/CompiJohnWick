<template>
  <div class="wrapper">
    <div class="top-right-buttons">
      <button @click="goToDashboard" class="top-button">Regresar a Dashboard</button>
    </div>
    <div class="registration-box">
      <h2>Misiones X_X</h2>
      <div class="dashboard">
        <h1>Opciones</h1>
        <button @click="setAction('registerMission')" class="dashboard-button">Registrar Misión</button>
        <button @click="setActionAndFetch('getMissions')" class="dashboard-button">Obtener Misiones</button>
        <button @click="currentAction = 'getMissionsByUser'" class="dashboard-button">Obtener Misiones por Usuario</button>
        <button @click="currentAction = 'executeMission'" class="dashboard-button">Ejecutar Misión</button>
      </div>
    </div>
    <div class="modal" v-if="currentAction">
      <div class="scrollable-card">
        <button class="close-button" @click="currentAction = ''">X</button>
        <!-- Register Mission Form -->
        <form v-if="currentAction === 'registerMission'">
          <h3>Registrar Misión</h3>
          <div class="input-box">
            <input type="text" placeholder="Ingrese usuario ejecutor" v-model="executor">
          </div>
          <div class="input-box">
            <input type="text" placeholder="Ingrese descripción de la misión" v-model="description">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="registerMission" value="Enviar">
          </div>
        </form>
        <!-- Fetched Missions -->
        <div v-if="currentAction === 'getMissions'">
          <h3>Misiones Obtenidas:</h3>
          <div v-if="missions.length">
            <ul>
              <li v-for="mission in missions" :key="mission._id">
                {{ formatMission(mission) }}
              </li>
            </ul>
          </div>
        </div>
        <!-- Get Missions by User Form -->
        <form v-if="currentAction === 'getMissionsByUser'">
          <h3>Obtener Misiones por Usuario</h3>
          <div class="input-box">
            <input type="text" placeholder="Ingrese nombre de usuario" v-model="username">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="getMissionsByUser" value="Enviar">
          </div>
          <div v-if="userMissions.length">
            <h4>Misiones del Usuario:</h4>
            <ul>
              <li v-for="mission in userMissions" :key="mission._id">
                {{ formatMission(mission) }}
              </li>
            </ul>
          </div>
        </form>
        <!-- Execute Mission Form -->
        <form v-if="currentAction === 'executeMission'">
          <h3>Ejecutar Misión</h3>
          <div class="input-box">
            <input type="text" placeholder="Ingrese ID de la misión a ejecutar" v-model="missionId">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="executeMission" value="Enviar">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentAction: '',
      executor: '',
      description: '',
      username: '',
      missionId: '',
      missions: [],
      userMissions: []
    };
  },
  methods: {
    goToDashboard() {
      this.$router.push({ path: '/' });
    },
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
        return data.isValid ? data.role : false;
      } catch (error) {
        console.error('Error:', error);
        return false;
      }
    },
    async registerMission() {
      if (await this.isLogged() !== 'AltaMesa') {
        alert('No tienes permisos para registrar misiones');
        return;
      }
      if (!this.executor || !this.description) {
        alert('El usuario ejecutor y la descripción no pueden estar vacíos');
        return;
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        };
        const formData = JSON.stringify({
          executor: this.executor,
          description: this.description
        });
        await axios.post('http://localhost:2023/mission/register', formData, config);
        alert('Misión registrada exitosamente');
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar misión');
      }
    },
    async getMissions() {
      try {
        const response = await axios.get('http://localhost:2023/mission/get-missions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.missions = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener misiones');
      }
    },
    async getMissionsByUser() {
      if (this.username === '') {
        alert('El nombre de usuario no puede estar vacío');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:2023/mission/get-missions/${this.username}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.userMissions = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('No existe tal usuario');
      }
    },
    async executeMission() {
      if (await this.isLogged() !== 'AltaMesa') {
        alert('No tienes permisos para ejecutar misiones');
        return;
      }
      if (this.missionId === '') {
        alert('El ID de la misión no puede estar vacío');
        return;
      }
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        };
        await axios.put(`http://localhost:2023/mission/execute/${this.missionId}`, {}, config);
        alert('Misión ejecutada exitosamente');
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error('Error:', error);
        alert('Error al ejecutar misión');
      }
    },
    setActionAndFetch(action) {
      this.currentAction = action;
      if (action === 'getMissions') {
        this.getMissions();
      }
    },
    setAction(action) {
      this.currentAction = action;
    },
    formatMission(mission) {
      return `State: ${mission.hasBeenExecuted} - Description: ${mission.description}`;
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
  background-color: rgba(255, 255, 255, 0.8);
  font-family: 'Arial', sans-serif;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.scrollable-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  overflow-y: auto;
  max-height: 90vh; /* Adjust based on your preference */
  position: relative;
}

.top-right-buttons {
  position: fixed;
  top: 10px;
  right: 10px;
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

.registration-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  max-width: 90%;
}

.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
  background-color: #265dce;
}

.input-box {
  margin: 10px 0;
}

.input-box input {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-box.button {
  display: flex;
  justify-content: center;
}

.input-box.button input {
  width: auto;
  background-color: #4070f4;
  color: white;
  border: none;
  cursor: pointer;
}

.input-box.button input:hover {
  background-color: #265dce;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
