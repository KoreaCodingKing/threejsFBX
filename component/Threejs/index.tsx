import { useAnimations, useFBX } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import React, { RefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

interface ThreeJSProps {
  canvasRef: RefObject<HTMLCanvasElement>;
}

const ThreeJS = ({ canvasRef }: ThreeJSProps) => {
  const model = useFBX("./images/Northern_Soul_Floor_Combo.fbx");
  const { ref, actions, names, mixer } = useAnimations(model.animations, model);
  // const [mixer] = new THREE.AnimationMixer(model);
  const fbxLoader = new FBXLoader();
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  var vector = new THREE.Vector3();

  useFrame(({ scene }) => {
    scene.position.x = -vector.x;
    scene.position.y = 0;
    scene.position.z = -vector.z;
  });

  useEffect(() => {
    names.forEach((name) => {
      actions[name]?.play();
    });
  }, []);

  return (
    <mesh castShadow>
      <primitive ref={ref} scale={0.01} object={model}></primitive>
    </mesh>
  );
};

export default ThreeJS;
