let scene, camera, renderer, geometry, loader, texture, mesh
init()
update()

function init(){
	scene = new THREE.Scene()
	scene.fog = new THREE.FogExp2(0x000000, 0.15)

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000)
	camera.position.set(0, 0, 7)
	camera.lookAt(new THREE.Vector3(0, 0, 0))

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// 平行光 橙色
	let light1 = new THREE.DirectionalLight(0xff8000);
	light1.position.set(1, 1, 0)
	scene.add(light1)
	// 平行光 绿色
	let light2 = new THREE.DirectionalLight(0xff8000);
	light2.position.set(-1, 1, 0)
	scene.add(light2)
	// 点光源 青色
	// let light3 = new THREE.PointLight(0x44FFAA, 15, 20);
	let light3 = new THREE.DirectionalLight(0x44FFAA);
	light3.position.set(0, -3, 0);
	scene.add(light3);
	// 点光源 橙色
	// let light4 = new THREE.PointLight(0xff4400, 20, 20);
	let light4 = new THREE.DirectionalLight(0xff4400);
	light4.position.set(3, 3, 0);
	scene.add(light4);

	geometry = new THREE.CylinderGeometry(1, 1, 30, 32, 1, true);
	let loader = new THREE.TextureLoader();
	texture = loader.load("static/textures/water.jpg");
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	let material = new THREE.MeshLambertMaterial({
			color: 0xFFFFFF,
			map: texture,
			// 双面
			side: THREE.DoubleSide
	});

	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.x = THREE.Math.degToRad( -80 );
	scene.add(mesh)
}

function update() {
		// 纹理的位置移动
		texture.offset.y += 0.008;
		texture.offset.y %= 1;
		let seconds = Date.now() / 1000;
		let radius = 0.9;
		let angle = Math.sin(0.75 * seconds * Math.PI) / 4;
		camera.position.x = Math.cos(angle - Math.PI / 2) * radius;
		camera.position.y = Math.sin(angle - Math.PI / 2) * radius;
		camera.rotation.z = angle;
		renderer.render(scene, camera);
		requestAnimationFrame(update);
}