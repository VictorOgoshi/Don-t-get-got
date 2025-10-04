import React from "react";

export default function MissionItem({ mission, onUpdate }) {
  return (
    <li style={{ marginBottom: "10px" }}>
      <span>{mission.text} - <b>{mission.status}</b></span>
      <div>
        {mission.status !== "completed" && (
          <button onClick={() => onUpdate(mission.id, "completed")}>
            Completar
          </button>
        )}
        {mission.status !== "got" && (
          <button onClick={() => onUpdate(mission.id, "got")}>
            Got Got!
          </button>
        )}
      </div>
    </li>
  );
}
