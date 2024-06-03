<template>
  <div class="wrapper">
    <div class="top-right-buttons">
      <button @click="goToDashboard" class="top-button">Regresar a Dashboard</button>
    </div>
    <div class="registration-box">
      <h2>Reglas UwU</h2>
      <div class="dashboard">
        <h1>Opciones</h1>
        <button @click="currentAction = 'registerConflict'; showModal = true" class="dashboard-button">Crea Conflicto</button>
        <button @click="setActionAndFetch('getConflicts'); showModal = true" class="dashboard-button">Get Conflictos</button>
        <button @click="currentAction = 'getConflictById'; showModal = true" class="dashboard-button">Get Conflicto by ID</button>
        <button @click="currentAction = 'resolveConflict'; showModal = true" class="dashboard-button">No Más Conflicto</button>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <div class="form-container">
          <form v-if="currentAction === 'registerConflict'">
            <h3>Create Conflicto</h3> 
            <div class="input-box">
              <input type="text" placeholder="Enter username 1" v-model="username1">
            </div>
            <div class="input-box">
              <input type="text" placeholder="Enter username 2" v-model="username2">
            </div>
            <div class="input-box button">
              <input type="submit" @click.prevent="createConflict" value="Submit">
            </div>
          </form>
          <div v-if="currentAction === 'getConflicts'">
            <h3>Conflictos Obtenidos:</h3>
            <div v-if="conflicts.length">
              <ul>
                <li v-for="conflict in conflicts" :key="conflict._id">
                  {{ formatConflict(conflict) }}
                </li>
              </ul>
            </div>
          </div>
          <div v-if="currentAction === 'getConflictById'">
            <h3>Get Conflicto by ID</h3>
            <div class="input-box">
              <input type="text" placeholder="Enter ID" v-model="conflictId">
            </div>
            <div class="input-box button">
              <input type="submit" @click.prevent="getConflictById" value="Submit">
            </div>
            <div v-if="conflictById">
              <h3>Conflicto Obtenido:</h3>
              <ul>
                <li>
                  {{ formatConflict(conflictById) }}
                </li>
              </ul>
            </div>
          </div>
          <form v-if="currentAction === 'resolveConflict'">
            <h3>Resolve Conflict</h3>
            <div class="input-box">
              <input type="text" placeholder="Enter Conflict ID" v-model="conflictIdToResolve">
            </div>
            <div class="input-box">
              <input type="text" placeholder="Enter Solution" v-model="solution">
            </div>
            <div class="input-box button">
              <input type="submit" @click.prevent="resolveConflict" value="Submit">
            </div>
          </form>
        </div>
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
      description: '',
      username1: '',
      username2: '',
      conflictId: '',
      conflictIdToResolve: '',
      solution: '',
      showModal: false,
      conflicts: [],
      conflictById: null
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
        if (data.isValid) {
          return data.role;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error:', error);
        return false;
      }
    },
    async createConflict() {
      if (await this.isLogged() !== 'AltaMesa') {
        alert('No tienes permisos para crear conflictos');
        return;
      }
      if (this.username1 === '' || this.username2 === '') {
        alert('Los nombres de usuario no pueden estar vacíos');
        return;
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        };
        const formData = {
          usersInvolved: [this.username1, this.username2]
        };
        await axios.post('http://localhost:2023/conflict/register-conflict', formData, config);
        alert('Conflicto creado exitosamente');
        this.showModal = false;
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to create conflict');
      }
    },
    async getConflicts() {
      try {
        const response = await axios.get('http://localhost:2023/conflict/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.conflicts = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener conflictos');
      }
    },
    async getConflictById() {
      if (this.conflictId === '') {
        alert('El ID no puede estar vacío');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:2023/conflict/get/${this.conflictId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.conflictById = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch conflict by ID');
      }
    },
    async resolveConflict() {
      if (await this.isLogged() !== 'AltaMesa') {
        alert('No tienes permisos para resolver conflictos');
        return;
      }
      if (this.conflictIdToResolve === '' || this.solution === '') {
        alert('El ID del conflicto y la solución no pueden estar vacíos');
        return;
      }
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        };
        const formData = {
          solution: this.solution
        };
        await axios.put(`http://localhost:2023/conflict/resolve-conflicts/${this.conflictIdToResolve}`, formData, config);
        alert('Conflicto resuelto exitosamente');
        this.showModal = false;
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to resolve conflict');
      }
    },
    formatConflict(conflict) {
      if(conflict.status === 'resolved') {
        return `${conflict.status}: ${conflict.solution}`;
      } else {
        return `${conflict.status}`;
      }
    },
    setActionAndFetch(action) {
      this.currentAction = action;
      if (action === 'getConflicts') {
        this.getConflicts();
      }
    },
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.registration-box h2 {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 8px;
  position: relative;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.form-container {
  width: 100%;
  margin-top: 20px;
}

.input-box {
  margin: 18px 0;
}

.input-box input {
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
.input-box input:valid {
  border-color: #4070f4;
}

.input-box.button input {
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

.input-box.button input:hover {
  background: #0e4bf1;
}

.form-container h3 {
  color: #333;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
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
</style>