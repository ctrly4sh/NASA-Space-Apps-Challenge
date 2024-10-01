import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const StarsBackground = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <Canvas>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <OrbitControls
          enableZoom={true}
          minDistance={1}
          maxDistance={1000}
          autoRotateSpeed={1.5}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
};

export default StarsBackground;
