import * as THREE from "three";

const HeroLights = () => (
    <>
        {/* lamp's light */}
        <spotLight
            position={[2, 1, 8]}
            angle={0.5}
            penumbra={0.2}
            intensity={80}
            color="white"
        />
        {/* bluish overhead lamp */}
        <spotLight
            position={[4, 5, 9]}
            angle={0.3}
            penumbra={1}
            intensity={100}
            color="#4cc9f0"
        />
        {/* purplish side fill */}
        <spotLight
            position={[-3, 4, 5]}
            angle={0.4}
            penumbra={1}
            intensity={500}
            color="#9d4edd"
        />
        {/* area light for soft moody fill */}
        <primitive
            object={new THREE.RectAreaLight("#a259ff", 8, 3, 2)}
            position={[1, 5, 3]}
            rotation={[-Math.PI / 8, Math.PI / 3, 0]}
            intensity={20}
        />
        {/* subtle point light for atmospheric tone */}
        <pointLight position={[0, 1, 0]} intensity={100} color="#7209b7" />
        <pointLight position={[1, 2, -2]} intensity={100} color="#0d00a4" />
    </>
);

export default HeroLights;
