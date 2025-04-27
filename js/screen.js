// TV Screen functionality
class TVScreen {
    constructor(scene) {
        // Create screen geometry (plane) with appropriate dimensions
        const geometry = new THREE.PlaneGeometry(1.2, 0.9);
        
        // Create material with enhanced visibility and glow
        this.material = new THREE.MeshBasicMaterial({
            color: 0x202020,
            transparent: true,
            opacity: 0.9,
            emissive: 0x202020,
            emissiveIntensity: 1.0
        });
        
        // Create screen mesh
        this.mesh = new THREE.Mesh(geometry, this.material);
        
        // Position and scale the screen to fit the TV model
        this.mesh.position.set(0, 0.2, 0.25);
        this.mesh.scale.set(0.25, 0.25, 0.25);
        this.mesh.rotation.set(-0.15, 0, 0);
        
        scene.add(this.mesh);
    }
}