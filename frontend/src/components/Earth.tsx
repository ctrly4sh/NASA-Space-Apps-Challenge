import { Cloud, Clouds, OrbitControls as DreiOrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three"

import { OrbitControls } from 'three-stdlib';

export default function Earth() {
    //   Load the textures
    const [earthTexture, cloudTexture] = useTexture([
        '/bodies/2k_earth_daymap.jpg',
        '/background/clouds-alpha-com.png'
    ]);
    const earthRef = useRef<THREE.Mesh>();
    const cloudRef = useRef<THREE.Mesh>();

    const controlsRef = useRef<OrbitControls>(null);

    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.001 / 3;
        }
        if (cloudRef.current) {
            cloudRef.current.rotation.y += 0.002 / 3;
        }
    })


    return <>

        {/* Lighting setup */}
        <ambientLight intensity={0.9} />
        <directionalLight intensity={4} position={[10, 10, 10]} />

        <mesh ref={earthRef}>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial
                map={earthTexture}

                roughness={0.8}
            />
        </mesh>


        {/* Cloud Layer */}
        <mesh ref={cloudRef}>
            <sphereGeometry args={[2.01, 64, 64]} />
            <meshStandardMaterial
                map={cloudTexture}
                transparent={true}
            />
        </mesh>

        {/* Orbit Controls for user interaction */}
        {/* <DreiOrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
        /> */}
   </>
}
