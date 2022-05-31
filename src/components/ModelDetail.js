import { Canvas } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { Bounds, ContactShadows, OrbitControls, Html } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useParams } from 'react-router-dom';

function ModelGltf(props) {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, `/models/${props.modelId}.gltf`);
  console.log(gltf)
  const { viewport } = useThree()
  
  return (
    <group ref={ref} {...props} rotation={[0,1,0]} scale={(viewport.width /3) + (viewport.height/3)} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  );
}
function ModelDetail() {
  const { modelId } = useParams();
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight color="white" position={[0, 0, 1]} />
      <fog attach="fog" args={['#101010', 0, 10]} />
      <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <ModelGltf modelId={modelId} position={[0,-1,0]}/>
          {/* <Html scale={1} transform occlude rotation={[0,1,0]}>
              <div style={{backgroundColor: "#000", borderRadius: '25px', color: '#fff', width: "100%"}}>
                6.550 $ <span style={{ fontSize: '1.5em' }}></span>
              </div>
          </Html> */}
        </Bounds>
      </Suspense>
      <OrbitControls rotateSpeed={0.01} makeDefault autoRotate minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      <ContactShadows rotation-x={Math.PI / 2} position={[0, -1.4, 0]} opacity={0.75} width={10} height={10} blur={2.6} far={2} />
    </Canvas>
  );
}

export default ModelDetail;
