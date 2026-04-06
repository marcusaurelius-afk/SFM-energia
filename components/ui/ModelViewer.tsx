'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei'
import type { Group } from 'three'

function Model() {
  const { scene } = useGLTF('/solar-container-pbr.glb')
  const ref = useRef<Group>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15
    }
  })

  return <primitive ref={ref} object={scene} scale={1} />
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-text-muted">Caricamento modello 3D...</p>
    </div>
  )
}

interface ModelViewerProps {
  className?: string
}

export function ModelViewer({ className }: ModelViewerProps) {
  return (
    <div className={`relative bg-gradient-to-b from-gray-50 to-white rounded-2xl overflow-hidden ${className ?? ''}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [4, 2, 6], fov: 40 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-4, 4, -4]} intensity={0.4} />

          <Model />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.35}
            scale={10}
            blur={2}
            far={4}
          />

          <Environment preset="city" />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={12}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>

      {/* Hint */}
      <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-text-muted/70 pointer-events-none select-none">
        Trascina per ruotare · Scorri per zoomare
      </p>
    </div>
  )
}
