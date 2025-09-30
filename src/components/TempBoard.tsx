import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { WebGPURenderer } from 'three/webgpu';

type OrbitControlsType = InstanceType<typeof OrbitControls>;

export default function TempBoard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
        renderer: THREE.WebGLRenderer | WebGPURenderer;
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        controls: OrbitControlsType;
        animationId: number;
    } | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a);

        // Create camera (will be updated with proper aspect ratio later)
        const camera = new THREE.PerspectiveCamera(
            45,
            1, // temporary aspect ratio
            0.1,
            1000
        );
        camera.position.set(8, 12, 8);
        camera.lookAt(0, 0, 0);

        // Create renderer (try WebGPU first for WebSpatial compatibility)
        const initScene = async () => {
            // Multiple attempts to get proper container dimensions
            let attempts = 0;
            let width = 0;
            let height = 0;

            while (attempts < 10 && (width === 0 || height === 0)) {
                await new Promise(resolve => setTimeout(resolve, 50));
                const containerRect = container.getBoundingClientRect();
                width = Math.max(containerRect.width, window.innerWidth, 800);
                height = Math.max(containerRect.height, window.innerHeight, 600);
                attempts++;
            }

            console.log('Final container size:', width, 'x', height);

            let renderer: THREE.WebGLRenderer | WebGPURenderer;
            let isWebGPU = false;

            try {
                renderer = new WebGPURenderer({ antialias: true, alpha: true });
                await renderer.init();
                // Check if WebGPU is actually available (not just WebGL2 fallback)
                const hasWebGPU = navigator.gpu !== undefined;
                if (hasWebGPU) {
                    isWebGPU = true;
                    console.log('Using WebGPU renderer for chessboard');
                } else {
                    console.log('WebGPU not available in navigator, using WebGL');
                    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                }
            } catch (error) {
                console.log('WebGPU init failed, using WebGL');
                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            }

            console.log('Setting renderer size:', width, 'x', height);
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);

            // Update camera aspect ratio now that we have proper dimensions
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            container.appendChild(renderer.domElement);

            // Create orbit controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 5;
            controls.maxDistance = 30;
            controls.maxPolarAngle = Math.PI / 2.1;

            // Store scene reference BEFORE starting animation
            sceneRef.current = {
                renderer,
                scene,
                camera,
                controls,
                animationId: 0
            };

            // Create chessboard
            createChessboard(scene);

            // Add lighting
            setupLighting(scene, camera);

            // Animation loop
            const animate = async () => {
                if (!sceneRef.current) return; // Safety check

                const id = requestAnimationFrame(animate);
                sceneRef.current.animationId = id;

                sceneRef.current.controls.update();

                if (isWebGPU && renderer instanceof WebGPURenderer) {
                    try {
                        await renderer.renderAsync(scene, camera);
                    } catch (error) {
                        // Handle WebGPU initialization errors gracefully
                        if (error instanceof TypeError && error.message.includes('GPUBuffer')) {
                            return; // Skip this frame
                        }
                        throw error;
                    }
                } else {
                    renderer.render(scene, camera);
                }
            };

            animate();

            // Handle resize
            const handleResize = () => {
                if (!container || !sceneRef.current) return;

                const rect = container.getBoundingClientRect();
                const newWidth = Math.max(rect.width || window.innerWidth, 1);
                const newHeight = Math.max(rect.height || window.innerHeight, 1);

                console.log('Resizing to:', newWidth, 'x', newHeight);
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                sceneRef.current.renderer.setSize(newWidth, newHeight);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        };

        initScene();

        // Cleanup
        return () => {
            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId);
                sceneRef.current.renderer.dispose();
                sceneRef.current.controls.dispose();
                if (container.contains(sceneRef.current.renderer.domElement)) {
                    container.removeChild(sceneRef.current.renderer.domElement);
                }
            }
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            style={{ 
                width: '100%', 
                height: '100vh', 
                position: 'relative',
                overflow: 'hidden'
            }}
        />
    );
}

function createChessboard(scene: THREE.Scene) {
    const boardSize = 8;
    const squareSize = 1.5;
    const boardThickness = 0.2;
    
    // Create board base
    const baseGeometry = new THREE.BoxGeometry(
        boardSize * squareSize,
        boardThickness,
        boardSize * squareSize
    );
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.7,
        metalness: 0.2
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -boardThickness / 2;
    base.receiveShadow = true;
    scene.add(base);

    // Create chessboard squares
    const lightSquareMaterial = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        roughness: 0.6,
        metalness: 0.1
    });
    const darkSquareMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.6,
        metalness: 0.1
    });

    const squareGeometry = new THREE.BoxGeometry(squareSize * 0.95, 0.1, squareSize * 0.95);

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const isLight = (row + col) % 2 === 0;
            const material = isLight ? lightSquareMaterial : darkSquareMaterial;
            
            const square = new THREE.Mesh(squareGeometry, material);
            
            // Position squares
            const x = (col - boardSize / 2 + 0.5) * squareSize;
            const z = (row - boardSize / 2 + 0.5) * squareSize;
            square.position.set(x, 0.05, z);
            square.receiveShadow = true;
            square.castShadow = true;
            
            scene.add(square);
        }
    }

    // Add border frame
    const frameThickness = 0.3;
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.5,
        metalness: 0.3
    });

    // Create four frame pieces
    const frameTop = new THREE.Mesh(
        new THREE.BoxGeometry(boardSize * squareSize + frameThickness * 2, frameThickness, frameThickness),
        frameMaterial
    );
    frameTop.position.set(0, frameThickness / 2, -(boardSize * squareSize) / 2 - frameThickness / 2);
    scene.add(frameTop);

    const frameBottom = frameTop.clone();
    frameBottom.position.z = (boardSize * squareSize) / 2 + frameThickness / 2;
    scene.add(frameBottom);

    const frameLeft = new THREE.Mesh(
        new THREE.BoxGeometry(frameThickness, frameThickness, boardSize * squareSize),
        frameMaterial
    );
    frameLeft.position.set(-(boardSize * squareSize) / 2 - frameThickness / 2, frameThickness / 2, 0);
    scene.add(frameLeft);

    const frameRight = frameLeft.clone();
    frameRight.position.x = (boardSize * squareSize) / 2 + frameThickness / 2;
    scene.add(frameRight);
}

function setupLighting(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Directional light for shadows and definition
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;
    scene.add(dirLight);

    // Add a subtle rim light
    const rimLight = new THREE.DirectionalLight(0x6699ff, 0.3);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // Point light for extra highlights
    const pointLight = new THREE.PointLight(0xffffff, 0.5, 50);
    pointLight.position.set(0, 8, 0);
    scene.add(pointLight);
}