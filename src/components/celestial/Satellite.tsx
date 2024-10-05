import { useGLTF } from "@react-three/drei"; // Ensure this is imported
import { Suspense } from "react";

const Satellite = ({position}:{position:number[]}) => {
    const { nodes, materials } = useGLTF("/images/satelite/satellites1.glb"); // Load the GLB model
    console.log(nodes.Course_Satellites_Model);
  
    return (
      <>
        <ambientLight intensity={0.2} color={0xffffff} />
            <directionalLight
                castShadow
                intensity={1.0} // Bright enough to simulate sunlight, but you can tweak it
                position={[5, 0, 0]} // You would compute this based on the sun's current position
                shadow-mapSize-width={2048} // Higher for better shadow quality
                shadow-mapSize-height={2048} // Higher for better shadow quality
                // Further properties to set shadow camera frustum might be needed
            />
            <pointLight
                position={[0, 0, 0]} // The sun's position
                intensity={1.5} // Quite bright to represent the sun's light
                decay={2} // Natural light falloff
                distance={50} // Affects the reach of the light
            />
        {nodes.Course_Satellites_Model.children.map((child, index) => (
            <mesh
            key={index}
            geometry={child.geometry}
            material={child.material || <meshStandardMaterial color="white" />}
            position={position}
            scale={0.01}
            />
        ))}
      </>
    );
  };

export default Satellite