<template>
  <div class="wrapper">
    <div class="registration-box">
      <h2>Reglas UwU</h2>
      <div class="dashboard">
        <h1>Opciones</h1>
        <button @click="currentAction = 'createRule'" class="dashboard-button">Crea Rule</button>
        <button @click="currentAction = 'getRules'" class="dashboard-button">Get Rules</button>
        <button @click="currentAction = 'getRuleById'" class="dashboard-button">Get Rule by ID</button>
        <button @click="currentAction = 'getRulesByCreator'" class="dashboard-button">Reglas por Creador</button>
        <button @click="currentAction = 'modifyRule'" class="dashboard-button">Modifica Regla</button>
      </div>
      <div class="form-container">
        <form v-if="currentAction === 'createRule'">
          <h3>Create Rule</h3>
          <div class="input-box">
            <input type="text" placeholder="Enter description" v-model="description">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="createRule" value="Submit">
          </div>
        </form>
        <form v-if="currentAction === 'getRuleById'">
          <h3>Get Rule by ID</h3>
          <div class="input-box">
            <input type="text" placeholder="Enter ID" v-model="ruleId">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="getRuleById" value="Submit">
          </div>
        </form>
        <form v-if="currentAction === 'getRulesByCreator'">
          <h3>Get Rules by Creator</h3>
          <div class="input-box">
            <input type="text" placeholder="Enter Creator ID" v-model="creatorId">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="getRulesByCreator" value="Submit">
          </div>
        </form>
        <form v-if="currentAction === 'modifyRule'">
          <h3>Modify Rule</h3>
          <div class="input-box">
            <input type="text" placeholder="Enter new description" v-model="newDescription">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="modifyRule" value="Submit">
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
      description: '',
      ruleId: '',
      creatorId: '',
      newDescription: ''
    };
  },
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
          return data.role;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error:', error);
        return false;
      }
    },
    async createRule() {
      // Implement create rule functionality
      const role = await this.isLogged();
      if (role !== 'AltaMesa') {
        alert('No tienes permisos para crear reglas');
        return;
      }
      if (this.description === '') {
        alert('La descripción no puede estar vacía');
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
          description: this.description
        };
        const response = await axios.post('http://localhost:2023/rule/create', formData, config);
        alert('Regla creada exitosamente');
      } catch (error) {
        console.error('Error:', error);
        return;
      }
    },
    async getRuleById() {
      // Implement get rule by ID functionality
    },
    async getRulesByCreator() {
      // Implement get rules by creator functionality
    },
    async modifyRule() {
      // Implement modify rule functionality
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
</style>
