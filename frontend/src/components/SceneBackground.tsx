import {Stars} from '@react-three/drei';


const SceneBackground = () => {
    return <Stars
        count={3000}
        depth={10}
        factor={3}
        saturation={1}
    />;
};

export default SceneBackground;
