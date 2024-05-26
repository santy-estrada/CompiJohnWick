<template>
    <div class="wrapper">
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
  export default {
    methods: {
      showRules() {
        console.log('Showing rules');
        // Implement functionality to show rules
      },
      showMissions() {
        console.log('Showing missions');
        // Implement functionality to show missions
      },
      showConflicts() {
        console.log('Showing conflicts');
        // Implement functionality to show conflicts
      },
      showSanctions() {
        console.log('Showing sanctions');
        // Implement functionality to show sanctions
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
  