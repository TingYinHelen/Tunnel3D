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

	geometry = new THREE.CylinderGeometry(1, 1, 30, 32, 2, true)
	texture = new THREE.ImageUtils.loadTexture('static/textures/water.jpg', {}, ()=>{
		renderer.render(scene, camera)
	})
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping
	const material = new THREE.MeshLambertMaterial({color: 0xffffff,
																									map: texture,
																									side: THREE.DoubleSide
																								})
	mesh = new THREE.Mesh(geometry, material)
	mesh.rotation.x = THREE.Math.degToRad( -80 );
	scene.add(mesh)
	//加一只狗
	const geometryDog = new THREE.PlaneGeometry(1, 1, 32)
	const textureDog = new THREE.ImageUtils.loadTexture('static/textures/dog2.png', {}, ()=>{
		renderer.render(scene, camera)
	})
	const materialDog = new THREE.MeshBasicMaterial({
		map: textureDog,
		transparent: true,
		depthTest: false
	})
	const meshDog = new THREE.Mesh(geometryDog, materialDog)
	meshDog.position.set(0,-1,3)
	scene.add(meshDog)



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
	// scene.add(light)
	renderer.render(scene, camera)
}


function update() {
		// 纹理的位置移动
		texture.offset.y += 0.008;
		let seconds = Date.now() / 1000;
		let radius = 0.9;
		let angle = Math.sin(0.75 * seconds * Math.PI) / 4;
		camera.position.x = Math.cos(angle - Math.PI / 2) * radius;
		camera.position.y = Math.sin(angle - Math.PI / 2) * radius;
		camera.rotation.z = angle;
		renderer.render(scene, camera);
		requestAnimationFrame(update);
}


