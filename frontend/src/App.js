import React, { useEffect, useState } from 'react';
import { getAllPlayers } from './services/api';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(()=> {
    const fetchPlayers = async () => {
      try {
        const response = await getAllPlayers();
        setPlayers(response.data);
      }catch (err){
        console.error('Error fetching players:', err);
      }
    };
    fetchPlayers();
  }, []);
 

return (
  <div>
    <h1>Player Management System</h1>
    <ul>
      {players.map(player => (
        <li key={player._id}>{player.name}</li>
      ))}
    </ul>
  </div>
);
}

export default App;
