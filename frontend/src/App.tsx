import { useEffect, useRef } from 'react'
import { ArcRotateCamera, Color3, Engine, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core'
import './App.css'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)
    scene.clearColor.set(0.05, 0.07, 0.1, 1)

    const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.6, 6, Vector3.Zero(), scene)
    camera.attachControl(canvas, true)

    const light = new HemisphericLight('light', new Vector3(1, 1, 0), scene)
    light.intensity = 0.9

    const ground = MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene)
    ground.position.y = -1

    const box = MeshBuilder.CreateBox('box', { size: 1.5 }, scene)
    box.position.y = 0.2
    box.rotation.y = Math.PI / 4

    const boxMaterial = new StandardMaterial('boxMaterial', scene)
    boxMaterial.diffuseColor = new Color3(0.2, 0.6, 1)
    box.material = boxMaterial

    engine.runRenderLoop(() => {
      box.rotation.y += 0.01
      scene.render()
    })

    const onResize = () => engine.resize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      scene.dispose()
      engine.dispose()
    }
  }, [])

  return (
    <div className="app">
      <canvas ref={canvasRef} className="scene" />
    </div>
  )
}

export default App
