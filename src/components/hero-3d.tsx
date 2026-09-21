"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {Environment,Float,OrbitControls,RoundedBox} from "@react-three/drei";
import {useRef} from "react";
import * as THREE from "three";

function Sneaker(){
  const group=useRef<THREE.Group>(null);
  useFrame((state,delta)=>{if(!group.current)return;group.current.rotation.y+=delta*0.18;group.current.rotation.x=THREE.MathUtils.lerp(group.current.rotation.x,(state.pointer.y*-0.18),0.04);group.current.rotation.z=THREE.MathUtils.lerp(group.current.rotation.z,(state.pointer.x*-0.12),0.04);});
  return <group ref={group} rotation={[0.08,-0.35,-0.08]} scale={1.15}>
    <RoundedBox args={[3.4,.62,1.28]} radius={.28} smoothness={6} position={[0,-.35,0]}><meshStandardMaterial color="#e9e9e4" roughness={.28} metalness={.12}/></RoundedBox>
    <RoundedBox args={[2.45,.88,1.08]} radius={.34} smoothness={6} position={[-.3,.22,0]} rotation={[0,0,-.08]}><meshStandardMaterial color="#141414" roughness={.44}/></RoundedBox>
    <RoundedBox args={[1.05,1.15,.96]} radius={.32} smoothness={6} position={[.95,.46,0]} rotation={[0,0,.28]}><meshStandardMaterial color="#242424" roughness={.38}/></RoundedBox>
    <RoundedBox args={[1.45,.16,1.13]} radius={.08} smoothness={4} position={[-.35,.1,0]}><meshStandardMaterial color="#d7ff3f" emissive="#7a9200" emissiveIntensity={.3}/></RoundedBox>
    {[[-.58,.43],[-.22,.48],[.14,.5],[.5,.48]].map(([x,y],i)=><mesh key={i} position={[x,y,.57]} rotation={[0,0,-.06]}><torusGeometry args={[.12,.025,12,28]}/><meshStandardMaterial color="#efefe8"/></mesh>)}
    <mesh position={[-1.42,-.62,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.52,.52,.16,32]}/><meshStandardMaterial color="#050505"/></mesh>
    <mesh position={[1.2,-.62,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.52,.52,.16,32]}/><meshStandardMaterial color="#050505"/></mesh>
  </group>
}

export default function Hero3D(){
  return <div className="h-full w-full">
    <Canvas camera={{position:[0.3,1.2,6.2],fov:36}} dpr={[1,1.75]} gl={{antialias:true,alpha:true}}>
      <ambientLight intensity={.65}/>
      <directionalLight position={[5,6,4]} intensity={4}/>
      <directionalLight position={[-4,1,-3]} intensity={1.5} color="#d7ff3f"/>
      <Float speed={1.6} rotationIntensity={.28} floatIntensity={.7}><Sneaker/></Float>
      <Environment preset="city"/>
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={1.05} maxPolarAngle={2.05}/>
    </Canvas>
  </div>
}
