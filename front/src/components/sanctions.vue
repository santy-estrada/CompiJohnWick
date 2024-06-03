<template>
  <div class="wrapper">
    <div class="top-right-buttons">
      <button @click="goToDashboard" class="top-button">Regresar a Dashboard</button>
    </div>
    <div class="registration-box">
      <h2>Sanciones 0_0</h2>
      <div class="dashboard">
        <h1>Opciones</h1>
        <button @click="setAction('registerSanction')" class="dashboard-button">Crea Sanction</button>
        <button @click="setActionAndFetch('getSanctions')" class="dashboard-button">Get Sanctions</button>
        <button @click="currentAction = 'getSanctionById'" class="dashboard-button">Get Sanction by ID</button>
        <button @click="currentAction = 'updateSanction'" class="dashboard-button">Cambiar Sanction</button>
        <button @click="currentAction = 'addSanctionToUser'" class="dashboard-button">Add sanction to user</button>
      </div>
    </div>
    <div class="modal" v-if="currentAction">
      <div class="scrollable-card">
        <button class="close-button" @click="currentAction = ''">X</button>
        <!-- Existing Forms -->

        <!-- Add Sanction to User Form -->
        <form v-if="currentAction === 'addSanctionToUser'">
          <h3>Add Sanction to User</h3>
          <div class="input-box">
            <input type="text" placeholder="Enter User ID" v-model="userID">
          </div>
          <div class="input-box">
            <input type="text" placeholder="Enter Sanction ID" v-model="sanctionId">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="addSanctionToUser" value="Submit">
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
      cause: '',
      sanctionId: '',
      userID: '', // Added userID for the new form
      newCause: '',
      causes: [],
      newCauses: [],
      sanctions: [],
      sanction: null,
      sanctionType: ''
    };
  },
  methods: {
    goToDashboard() {
      this.$router.push({ path: '/' });
    },
    addCause() {
      if (this.cause) {
        this.causes.push(this.cause);
        this.cause = '';
      } else {
        alert('La causa no puede estar vacía');
      }
    },
    addNewCause() {
      if (this.newCause) {
        this.newCauses.push(this.newCause);
        this.newCause = '';
      } else {
        alert('La causa no puede estar vacía');
      }
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
    async createSanction() {
      if (await this.isLogged() !== 'AltaMesa') {
        alert('No tienes permisos para crear sanciones');
        return;
      }
      if (!this.causes.length || !this.sanctionType) {
        alert('Debe haber al menos una causa y un tipo de sanción seleccionado');
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
          causes: this.causes,
          typeSanction: this.sanctionType
        });
        await axios.post('http://localhost:2023/sanction/register', formData, config);
        alert('Sanción creada exitosamente');
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to create sanction');
      }
    },
    async getSanctions() {
      try {
        const response = await axios.get('http://localhost:2023/sanction/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.sanctions = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch sanctions');
      }
    },
    async getSanctionById() {
      if (this.sanctionId === '') {
        alert('El ID no puede estar vacío');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:2023/sanction/get/${this.sanctionId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.sanction = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch sanction by ID');
      }
    },
    async updateSanction() {
      if (await this.isLogged() !== 'AltaMesa') {
        alert('No tienes permisos para modificar sanciones');
        return;
      }
      if (this.sanctionId === '' || !this.newCauses.length) {
        alert('El ID y las nuevas causas no pueden estar vacíos');
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
          causes: this.newCauses
        });
        await axios.put(`http://localhost:2023/sanction/update/${this.sanctionId}`, formData, config);
        alert('Sanción modificada exitosamente');
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error('Error:', error);
        alert(error);
      }
    },
    async addSanctionToUser() {
      if (await this.isLogged() !== 'AltaMesa') {
        alert('No tienes permisos para agregar sanciones a usuarios');
        return;
      }
      if (!this.userID || !this.sanctionId) {
        alert('User ID y Sanction ID no pueden estar vacíos');
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
          userId: this.userID,
          sanctionId: this.sanctionId
        });
        await axios.put('http://localhost:2023/user/add-sanction', formData, config);
        alert('Sanción agregada al usuario exitosamente');
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error('Error:', error);
        alert(error);
      }
    },
    setActionAndFetch(action) {
      this.currentAction = action;
      if (action === 'getSanctions') {
        this.getSanctions();
      }
    },
    setAction(action) {
      this.currentAction = action;
    },
    formatSanction(sanction) {
      return `${sanction.causes.join(', ')}: ${sanction.typeSanction}`;
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
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
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

.input-box {
  margin: 10px 0;
}

.input-box input, .input-box select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-box.button input[type="submit"], .input-box.button button {
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}
</style>
