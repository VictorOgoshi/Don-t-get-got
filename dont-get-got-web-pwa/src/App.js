import React, { useState, useEffect } from "react";
import { allMissions } from "./data/missions";
import MissionList from "./components/MissionList";

function App() {
  const [missions, setMissions] = useState([]);
  const [missionCount, setMissionCount] = useState(
    () => parseInt(localStorage.getItem("missionCount")) || 6
  );
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("missions");
    if (saved) {
      setMissions(JSON.parse(saved));
      setGameStarted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("missions", JSON.stringify(missions));
    localStorage.setItem("missionCount", missionCount);
  }, [missions, missionCount]);

  const startGame = () => {
    const shuffled = [...allMissions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, missionCount).map(text => ({
      id: crypto.randomUUID(),
      text,
      status: "pending"
    }));
    setMissions(selected);
    setGameStarted(true);
  };

  const updateMission = (id, status) => {
    setMissions(missions.map(m =>
      m.id === id ? { ...m, status } : m
    ));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Don't Get Got</h1>

      {!gameStarted ? (
        <div>
          <p>Quantas missões você quer?</p>
          <input
            type="number"
            min="1"
            max={allMissions.length}
            value={missionCount}
            onChange={(e) => setMissionCount(Number(e.target.value))}
          />
          <button onClick={startGame}>Iniciar Jogo</button>
        </div>
      ) : (
        <div>
          <h2>Suas Missões</h2>
          <MissionList missions={missions} onUpdate={updateMission} />
        </div>
      )}
    </div>
  );
}

export default App;
