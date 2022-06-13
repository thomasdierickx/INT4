/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/stad.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Plain.geometry} material={materials.Material} position={[0, 0.5, 0]} scale={[50, 0, 50]} />
      <mesh geometry={nodes.Plain005.geometry} material={materials.Material} position={[-15, 5, 0]} scale={[10, 5, 10]} />
      <mesh geometry={nodes.Plain001.geometry} material={materials.Material} position={[-2.5, 5, 0]} scale={[2.5, 5, 5]} />
      <mesh geometry={nodes.Plain003.geometry} material={materials.Material} position={[5, 0.5, 5]} rotation={[0, Math.PI / 4, 0]} scale={[2.5, 0.5, 2]} />
      <mesh geometry={nodes.Plain004.geometry} material={materials.Material} position={[5, 0.5, -5]} rotation={[0, -Math.PI / 4, 0]} scale={[2.5, 0.5, 2]} />
    </group>
  )
}

useGLTF.preload('/stad.gltf')
