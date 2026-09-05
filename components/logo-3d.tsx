'use client'

import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

type Logo3DProps = {
  /** Path to the logo image. Defaults to the Die Wölfin dark logo. */
  src?: string
  /** How thick the slab is, relative to its height. */
  thickness?: number
  /** Rotation speed in radians per second. Set 0 to pause auto-rotation. */
  speed?: number
  /** Longest edge of the slab in world units. */
  size?: number
}

function LogoSlab({
  src = '/images/logo-dark.png',
  thickness = 0.18,
  speed = 0.6,
  size = 4,
}: Required<Logo3DProps>) {
  const groupRef = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, src)

  // Improve texture crispness
  useMemo(() => {
    texture.anisotropy = 8
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
  }, [texture])

  // Mirrored clone for the back cap so it reads correctly once it turns into view,
  // instead of showing the wordmark backwards.
  const backTexture = useMemo(() => {
    const t = texture.clone()
    t.wrapS = THREE.RepeatWrapping
    t.repeat.x = -1
    t.offset.x = 1
    t.needsUpdate = true
    return t
  }, [texture])

  // A round medallion (not a box) so the rim is a curved edge at every angle,
  // instead of showing a flat rectangular pole when it turns edge-on.
  const radius = size / 2
  const depth = thickness * size

  const materials = useMemo(() => {
    const frontMat = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.4,
      roughness: 0.4,
      emissive: new THREE.Color('#1a0f14'),
      emissiveIntensity: 0.25,
    })
    const backMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      metalness: 0.4,
      roughness: 0.4,
      emissive: new THREE.Color('#1a0f14'),
      emissiveIntensity: 0.25,
    })
    const rimMat = new THREE.MeshStandardMaterial({
      color: '#c9c9ce',
      metalness: 0.75,
      roughness: 0.3,
    })
    // CylinderGeometry material order: [side, top, bottom]
    return [rimMat, frontMat, backMat]
  }, [texture, backTexture])

  useFrame((_, delta) => {
    if (groupRef.current && speed !== 0) {
      groupRef.current.rotation.y += delta * speed
    }
  })

  return (
    <group ref={groupRef}>
      {/* rotated so the caps face the camera (+Z/-Z) instead of up/down (+Y/-Y) */}
      <mesh material={materials} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[radius, radius, depth, 96]} />
      </mesh>
    </group>
  )
}

export function Logo3D({
  src = '/images/logo-dark.png',
  thickness = 0.18,
  speed = 0.6,
  size = 4,
  className,
}: Logo3DProps & { className?: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={className ?? 'h-screen w-full'}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <hemisphereLight args={['#e6dde2', '#0b0b0b', 0.6]} />
        <spotLight
          position={[5, 6, 5]}
          angle={0.5}
          penumbra={0.8}
          intensity={110}
          color="#ffffff"
        />
        <spotLight
          position={[-6, -2, 4]}
          angle={0.6}
          penumbra={1}
          intensity={55}
          color="#e0b7c3"
        />
        <Suspense fallback={null}>
          <LogoSlab
            src={src}
            thickness={thickness}
            // pause auto-spin on hover so users can see the face
            speed={hovered ? 0 : speed}
            size={size}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Logo3D
