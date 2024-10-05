import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import * as THREE from "three";

// Function to generate random asteroid shapes
const getRandomAsteroidGeometry = () => {
  const type = Math.floor(Math.random() * 3); // Randomly choose an asteroid type
  switch (type) {
    case 0:
      return new THREE.IcosahedronGeometry(0.03 + Math.random() * 0.01, 1);
    case 1:
      return new THREE.OctahedronGeometry(0.03 + Math.random() * 0.01, 1);
    case 2:
      return new THREE.OctahedronGeometry(0.03 + Math.random() * 0.02, 1);
    default:
      return new THREE.IcosahedronGeometry(0.03 + Math.random() * 0.05, 1);
  }
};

interface AsteroidData {
  id: string;
  initialPosition: Vector3;
  radius: number;
  rotationSpeed: number;
  orbitSpeed: number;
  angle: number; // Store the current angle for orbit calculation
  distanceFromEarth: number; // Distance from Earth for each asteroid
  geometry: THREE.BufferGeometry; // Store a custom geometry for each asteroid
  texture: THREE.Texture; // Store a custom texture for each asteroid
}

const generateAsteroids = (number: number, isZoom: boolean): AsteroidData[] => {
  const asteroids = [];
  const textures = [
    new THREE.TextureLoader().load("/images/bodies/as3.webp"),
    new THREE.TextureLoader().load("/images/bodies/as1.webp"),
    new THREE.TextureLoader().load("/images/bodies/as2.webp"),
  ]; // Load different textures for variation

  for (let i = 0; i < number; i++) {
    const randomAngle = Math.random() * Math.PI * 2; // Random initial angle for each asteroid
    const distanceFromEarth = 3.2 + Math.random() * 0.5 ; // Random distance from Earth's orbit (around 3 units)

    // Create an initial position for the asteroid based on the angle
    const x = Math.cos(randomAngle) * distanceFromEarth;
    const z = Math.sin(randomAngle) * distanceFromEarth;
    const y = (Math.random() - 0.5) * 0.1; // Slight random height offset

    // Get a random geometry for the asteroid
    const geometry = getRandomAsteroidGeometry();

    asteroids.push({
      id: `asteroid-${i}`,
      initialPosition: new Vector3(x, y, z),
      radius: 0.05 + Math.random() * 0.05,
      rotationSpeed: isZoom ? 0 : Math.random() * 0.5 + 0.5,
      orbitSpeed: isZoom ? 0 : Math.random() * 0.3 * 0.2, // Different orbit speeds for variation
      angle: randomAngle, // Starting angle for orbit
      distanceFromEarth, // Store the distance from Earth
      geometry, // Store the irregular shape
      texture: textures[Math.floor(Math.random() * textures.length)], // Randomly assign a texture
    });
  }
  return asteroids;
};

const AsteroidRing = ({ isZoom }: { isZoom: boolean }) => {
  const asteroids = useMemo(() => generateAsteroids(70, isZoom), []);

  useFrame((state, delta) => {
    if (!isZoom) {
      asteroids.forEach((asteroid) => {
        // Update the angle of the asteroid based on its orbit speed
        asteroid.angle += asteroid.orbitSpeed * delta;

        // Calculate the updated x and z position for orbiting
        const x = Math.cos(asteroid.angle) * asteroid.distanceFromEarth;
        const z = Math.sin(asteroid.angle) * asteroid.distanceFromEarth;

        // Update the initialPosition to reflect the new orbit
        asteroid.initialPosition.set(x, asteroid.initialPosition.y, z); // Keep the same y (height)
      });
    }
  });

  return (
    <>
      {asteroids.map((asteroid) => (
        <mesh
          key={asteroid.id}
          geometry={asteroid.geometry}
          position={
            new Vector3(
              asteroid.initialPosition.x,
              asteroid.initialPosition.y,
              asteroid.initialPosition.z
            )
          }
        >
          <meshStandardMaterial map={asteroid.texture} flatShading={false} />
        </mesh>
      ))}
    </>
  );
};

export default AsteroidRing;