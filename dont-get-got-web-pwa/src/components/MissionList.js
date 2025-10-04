import React from "react";
import MissionItem from "./MissionItem";

export default function MissionList({ missions, onUpdate }) {
  return (
    <ul>
      {missions.map(mission => (
        <MissionItem key={mission.id} mission={mission} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}
