import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import SceneInit from './lib/SceneInit';

function App() {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    test.renderer.alpha = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    test.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    test.scene.add(directionalLight);

    let loadedModel;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/rocket.glb', (gltfScene) => {
      loadedModel = gltfScene;
      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 3;
      gltfScene.scene.scale.set(10, 10, 10);

      test.scene.add(gltfScene.scene);
    });

    const handleHover = () => {
      setIsHovered(true);
    };

    const handleUnhover = () => {
      setIsHovered(false);
    };

    if (loadedModel) {
      loadedModel.scene.onPointerOver = handleHover;
      loadedModel.scene.onPointerOut = handleUnhover;
    }

    const updateModelRotation = () => {
      if (loadedModel) {
        if (isHovered) {
          loadedModel.scene.rotation.y += 0.005;
        }
      }
      requestAnimationFrame(updateModelRotation);
    };

    updateModelRotation();
  }, [isHovered]);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
