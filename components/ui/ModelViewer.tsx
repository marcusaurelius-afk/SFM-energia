'use client'

import { useEffect, useState } from 'react'

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string
          alt?: string
          'auto-rotate'?: string
          'camera-controls'?: string
          'shadow-intensity'?: string
          'rotation-per-second'?: string
          loading?: string
          poster?: string
          style?: React.CSSProperties
        },
        HTMLElement
      >
    }
  }
}

interface ModelViewerProps {
  className?: string
}

export function ModelViewer({ className }: ModelViewerProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (document.querySelector('script[data-model-viewer]')) {
      setLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js'
    script.setAttribute('data-model-viewer', 'true')
    script.onload = () => setLoaded(true)
    document.head.appendChild(script)
  }, [])

  return (
    <div
      className={`relative bg-gradient-to-b from-gray-50 to-white rounded-2xl overflow-hidden ${className ?? ''}`}
    >
      {loaded ? (
        <model-viewer
          src="/solar-container-pbr.glb"
          alt="SolarCrate SFM-20 container solare fotovoltaico"
          auto-rotate="true"
          camera-controls="true"
          shadow-intensity="1.5"
          rotation-per-second="20deg"
          environment-image="neutral"
          tone-mapping="neutral"
          loading="lazy"
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Caricamento modello 3D...</p>
        </div>
      )}

      <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-text-muted/70 pointer-events-none select-none">
        Trascina per ruotare · Scorri per zoomare
      </p>
    </div>
  )
}
