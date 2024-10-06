// {
//     id: 3,
//         name: "Earth",
//             texturePath: "/images/bodies/earth_2k.webp",
//                 position: new Vector3(3, 0, 0),
//                     radius: 0.15,
//                         rotationSpeed: 1,
//                             tilt: 0.40928,
//                                 orbitSpeed: 0.6,
//                                     displayStats: {
//         classification: "Terrestrial planet",
//             orbitalPeriod: 365.25,
//                 meanDistanceFromSun: 1,
//                     accurateRadius: 6371,
//                         mass: 1,
//                             surfaceGravity: 1,
//                                 rotationPeriod: 23.93,
//                                     axialTilt: 23.44,
//                                         numberOfMoons: 1,
//                                             atmosphericComposition: "Nitrogen, oxygen",
//                                                 surfaceTemp: "-88 to 58°C",
//     },
//     moons: [],
//   },

import { Vector3 } from "three";
import { PlanetData } from "../types/planet";


const baseOrbitSpeed = 1;

const planeData: PlanetData[] = [
    {
        id: 3,
        name: "Earth",
        texturePath: "/images/bodies/earth_2k.webp",
        position: new Vector3(3, 0, 0),
        radius: 0.15,
        rotationSpeed: 1,
        tilt: 0.40928,
        orbitSpeed: 0.6,
        displayStats: {
            classification: "Terrestrial planet",
            orbitalPeriod: 365.25,
            meanDistanceFromSun: 1,
            accurateRadius: 6371,
            mass: 1,
            surfaceGravity: 1,
            rotationPeriod: 23.93,
            axialTilt: 23.44,
            numberOfMoons: 1,
            atmosphericComposition: "Nitrogen, oxygen",
            surfaceTemp: "-88 to 58°C",
        },
        moons: [],
    },
]
