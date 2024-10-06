import { useMemo, useEffect, useRef, useState } from 'react';
import { EdgesGeometry, LineBasicMaterial, SphereGeometry, TextureLoader } from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import Ring from './GuideRing';
import { PlanetData } from '../../../types';
import { usePlanetPositions } from '../../contexts/PlanetPositionsContext';
import { Mesh } from 'three';
import SaturnRings from './SaturnRings';
import { useSelectedPlanet } from '../../contexts/SelectedPlanetContext';
import { useSpeedControl } from '../../contexts/SpeedControlContext';
import { useCameraContext } from '../../contexts/CameraContext';
import Satellite from './Satellite';
import Moon from './Moon';

type ExtendedPlanetData = PlanetData & { orbitProgress: number };

const Planet: React.FC<ExtendedPlanetData> = ({
  name,
  texturePath,
  position,
  radius,
  orbitProgress,
  tilt,
  rotationSpeed,
  rings,
  planets
}) => {
  const { setPlanetPosition } = usePlanetPositions();
  const texture = useLoader(TextureLoader, texturePath);
  const sphereArgs = useMemo(() => [radius, 64, 64] as [number, number, number], [radius]);
  const orbitRadius = position.x;
  const x = Math.cos(orbitProgress) * orbitRadius;
  const z = Math.sin(orbitProgress) * orbitRadius;
  const ref = useRef<Mesh>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [selectedPlanet, setSelectedPlanet] = useSelectedPlanet();
  const { overrideSpeedFactor } = useSpeedControl();
  const { cameraState, setCameraState } = useCameraContext();

  const [isHover,setIsHover] = useState(false);
  const [edgesGeometry,setEdgesGeometry] = useState<EdgesGeometry<SphereGeometry> | null>(null);

  const satelitePositionX = x + Math.cos(0) * 0.2;
  const satelitePositionZ = z + Math.sin(0) * 0.3;
  const satellitePosition = (name === 'Earth') ? [satelitePositionX,0,satelitePositionZ] : null;

  const moonSpeed = 0.02; 
  const [moonOrbitProgress, setMoonOrbitProgress] = useState(0);

  useFrame(() => {
    setMoonOrbitProgress((prev) => prev + moonSpeed);
  });

  const moonPositionX = Math.cos(moonOrbitProgress) - 0.1;
  const moonPositionZ = Math.sin(moonOrbitProgress) - 0.0003;

  useFrame(() => {
    if (ref.current) {
      const rotationPerFrame = (rotationSpeed * (Math.PI / 180)) / 60;
      ref.current.rotation.y -= rotationPerFrame;
    }
  });

  useEffect(() => {
    setPlanetPosition(name, [x, 0, z]);
  }, [x, z, name, setPlanetPosition]);

  const handleform = () => {
    const selected = planets.find((planet) => planet.name === name);
    setSelectedPlanet(selected ?? null);
    overrideSpeedFactor();
    setCameraState('ZOOMING_IN');
  }

  const scalePlanet = () => {
    if(!isHover)
    {
      setEdgesGeometry(new EdgesGeometry(new SphereGeometry(radius, 20, 20)));
      setIsHover(true);
    } 
  }

  const unscalePlanet = () => {
    if(isHover)
    {
      setEdgesGeometry(null);
      setIsHover(false);
    }
  }

  return (
    <>
     <mesh ref={ref} onClick={handleform} onPointerOver={scalePlanet} onPointerOut={unscalePlanet} position={[x, 0, z]} rotation={[tilt, 0, 0]}>
          <Sphere args={sphereArgs}>
            <meshStandardMaterial map={texture}/>
          </Sphere>
          {
            (isHover && edgesGeometry!=null) && <lineSegments args={[edgesGeometry, new LineBasicMaterial({ color: 'skyblue', linewidth: 2 })]} />
          }
          {rings && (
            <SaturnRings
              texturePath={rings.texturePath}
              innerRadius={rings.size[0]}
              outerRadius={rings.size[1]}
            />
          )}
          {name === 'Earth' && (
            <>
              <pointLight position={[moonPositionX, 0, moonPositionZ]} intensity={0.8} color="white" />
              
              <mesh position={[moonPositionX, 0,moonPositionZ]}>
                <Sphere args={[0.05, 32, 32]}>
                  <meshStandardMaterial emissive="white" emissiveIntensity={1.5} color="white" />
                </Sphere>
              </mesh>
            </>
            
          )}
      </mesh>
      {satellitePosition && <Satellite position={satellitePosition} />}
      
      <Ring radius={orbitRadius} />
    </>
  );
};

export default Planet;
