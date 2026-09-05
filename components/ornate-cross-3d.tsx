'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Loads the cross art and rebuilds its alpha channel from luminance, so the
 * pure-black background becomes fully transparent. This lets us keep the
 * additive-glow look WITHOUT the rectangular plane silhouettes ever showing.
 */
function useLuminanceTexture(url: string) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    let disposed = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = url
    img.onload = () => {
      if (disposed) return
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const px = data.data
      for (let i = 0; i < px.length; i += 4) {
        // Perceived luminance drives alpha; dark background -> transparent.
        const lum = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]
        px[i + 3] = lum
      }
      ctx.putImageData(data, 0, 0)
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = 8
      tex.needsUpdate = true
      setTexture(tex)
    }
    return () => {
      disposed = true
    }
  }, [url])

  return texture
}

type CrossPlanesProps = {
  speed?: number
  scale?: number
}

/**
 * The cross is drawn onto two perpendicular planes (a billboard cross). As
 * the group spins on the Y axis, one plane always faces the viewer while the
 * other fills in, so it reads as a solid volumetric ornament and never
 * collapses to a paper-thin sliver at any angle.
 */
function CrossPlanes({ speed = 0.25, scale = 1 }: CrossPlanesProps) {
  const group = useRef<THREE.Group>(null)
  const texture = useLuminanceTexture('/images/ornate-cross.png')

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * speed
  })

  const size = 6 * scale

  const material = useMemo(() => {
    if (!texture) return null
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.04,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    })
  }, [texture])

  if (!material) return null

  return (
    <group ref={group}>
      <mesh material={material}>
        <planeGeometry args={[size, size]} />
      </mesh>
      <mesh material={material} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size, size]} />
      </mesh>
    </group>
  )
}

type OrnateCross3DProps = {
  className?: string
  speed?: number
  scale?: number
  /** Set true to fill the canvas with the near-black brand backdrop. */
  solidBackground?: boolean
}

export function OrnateCross3D({
  className,
  speed = 0.25,
  scale = 1,
  solidBackground = false,
}: OrnateCross3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ alpha: !solidBackground, antialias: true }}
        dpr={[1, 2]}
      >
        {solidBackground && <color attach="background" args={['#0b0b0b']} />}
        <Suspense fallback={null}>
          <CrossPlanes speed={speed} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default OrnateCross3D
