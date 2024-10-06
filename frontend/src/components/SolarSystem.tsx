import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";  // For handling async rendering

export default function SolarSystem() {
  return (
    <>
      <Canvas style={{ background: "white" }} gl={{ alpha: false }}>
        <Suspense fallback={<span>Loading...</span>}>
          <Model />
        </Suspense>
      </Canvas>
    </>
  );
}

function Model() {
  const { scene } = useGLTF("/model/ImageToStl.com_uploads_files_28118_asteroid_3ds.glb");  // Load the model
  return <primitive object={scene} />;
}
