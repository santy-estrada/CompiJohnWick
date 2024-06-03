<template>
  <div class="wrapper">
    <div class="top-right-buttons">
      <button @click="goToDashboard" class="top-button">Regresar a Dashboard</button>
    </div>
    <div class="registration-box">
      <h2>Reglas UwU</h2>
      <div class="dashboard">
        <h1>Opciones</h1>
        <button @click="setActionAndFetch('createRule')" class="dashboard-button">Crea Rule</button>
        <button @click="setActionAndFetch('getRules')" class="dashboard-button">Get Rules</button>
        <button @click="currentAction = 'getRuleById'" class="dashboard-button">Get Rule by ID</button>
        <button @click="setAction('getRulesByCreator')" class="dashboard-button">Reglas por Creador</button>
        <button @click="currentAction = 'modifyRule'" class="dashboard-button">Modifica Regla</button>
      </div>
    </div>
    <div class="modal" v-if="currentAction">
      <div class="scrollable-card">
        <button class="close-button" @click="currentAction = ''">X</button>
        <form v-if="currentAction === 'createRule'">
          <h3>Create Rule</h3>
          <div class="input-box">
            <input type="text" placeholder="Enter description" v-model="description">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="createRule" value="Submit">
          </div>
        </form>
        <div v-if="currentAction === 'getRules'">
          <h3>Fetched Rules:</h3>
          <div v-if="rules.length">
            <ul>
              <li v-for="rule in rules" :key="rule._id">{{ rule.description }}</li>
            </ul>
          </div>
        </div>
        <form v-if="currentAction === 'getRuleById'">
          <h3>Get Rule by ID</h3>
          <div class="input-box">
            <input type="text" placeholder="Enter ID" v-model="ruleId">
          </div>
          <div class="input-box button">
            <input type="submit" @click.prevent="getRuleById" value="Submit">
          </div>
          <div v-if="rule">
            <h4>Fetched Rule:</h4>
            <p>{{ rule.description }}</p>
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
          <div v-if="rules.length">
            <h4>Fetched Rules:</h4>
            <ul>
              <li v-for="rule in rules" :key="rule._id">{{ rule.description }}</li>
            </ul>
          </div>
        </form>
        <form v-if="currentAction === 'modifyRule'">
          <h3>Modify Rule</h3>
          <div class="input-box">
            <input type="text" placeholder="Enter ID of the rule to modify" v-model="ruleId">
          </div>
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
      newDescription: '',
      rules: [],
      rule: null,
    };
  },
  methods: {
    goToDashboard() {
      this.$router.push({ path: '/' });
    },
    async createRule() {
      let response;
      try {
        response = await axios({
          method: 'get',
          url: 'http://localhost:2023/user/validate-token',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } catch (error) {
        console.error('Error:', error);
        return;
      }
      const role = response.data.role;
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
        const formData = JSON.stringify({ description: this.description });
        await axios.post('http://localhost:2023/rule/create', formData, config);
        alert('Regla creada exitosamente');
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error('Error:', error);
        this.$router.push({ path: '/' });
        return;
      }
    },
    async getRules() {
      try {
        const response = await axios.get('http://localhost:2023/rule/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.rules = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch rules');
      }
    },
    async getRuleById() {
      if (this.ruleId === '') {
        alert('El ID no puede estar vacío');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:2023/rule/get/${this.ruleId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.rule = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch rule by ID');
      }
    },
    async getRulesByCreator() {
      this.rules = [];  // Clear rules before fetching
      if (this.creatorId === '') {
        alert('El ID del creador no puede estar vacío');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:2023/rule/get-creator/${this.creatorId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.rules = response.data;
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch rules by creator');
      }
    },
    async modifyRule() {
      if (this.ruleId === '' || this.newDescription === '') {
        alert('ID y la nueva descripción no pueden estar vacíos');
        return;
      }
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        };
        const formData = JSON.stringify({ description: this.newDescription });
        await axios.put(`http://localhost:2023/rule/modify/${this.ruleId}`, formData, config);
        alert('Regla modificada exitosamente');
        this.$router.push({ path: '/' });
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to modify rule');
      }
    },
    setActionAndFetch(action) {
      this.currentAction = action;
      if (action === 'getRules') {
        this.getRules();
      }
    },
    setAction(action) {
      this.currentAction = action;
      if (action === 'getRulesByCreator') {
        this.rules = []; // Clear rules when switching to 'getRulesByCreator'
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
  background-color: rgba(255, 255, 255, 0.8);
  font-family: 'Arial', sans-serif;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
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