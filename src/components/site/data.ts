import hero from "@/assets/hero-robot.jpg";
import titan from "@/assets/fighter-titan.jpg";
import falcon from "@/assets/fighter-falcon.jpg";

export const fighters = [
  { name: "White Eagle", unit: "T800-WE01", cls: "Heavyweight", img: hero, record: "14-1-0", weight: 78, torque: 450, velocity: 9.4, kos: 11, style: "Counter-striker", actuator: "Planetary BLDC + harmonic drive", dof: 31 },
  { name: "Steel Titan", unit: "T800-ST03", cls: "Super Heavyweight", img: titan, record: "12-2-0", weight: 92, torque: 520, velocity: 8.1, kos: 10, style: "Pressure brawler", actuator: "Hydraulic linear (hip/knee)", dof: 29 },
  { name: "Red Falcon", unit: "T800-RF07", cls: "Middleweight", img: falcon, record: "9-0-0", weight: 64, torque: 380, velocity: 10.6, kos: 6, style: "Kick specialist", actuator: "Quasi-direct drive BLDC", dof: 33 },
];
export type Fighter = (typeof fighters)[number];

export const partners = ["EngineAI", "Servotek", "Kinetik", "ArenaOne", "Voltra", "Torqline", "Hexacore", "Ironpulse"];
