/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	let scene = new THREE.Scene();
	let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000);
	camera.position.set(0, 0, 7);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	let renderer = new THREE.WebGLRenderer({
			//antialias: true, // 是否进行抗锯齿
			preserveDrawingBuffer: true // 是否保留缓冲区，直到手动清除或覆盖。
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	document.body.appendChild(renderer.domElement);
	// THREEx.WindowResize.bind(renderer, camera);
	// 平行光 橙色
	let light1 = new THREE.DirectionalLight(0xff8000, 0.5);
	light1.position.set(1, 1, 0).normalize();
	scene.add(light1);
	// 平行光 绿色
	let light2 = new THREE.DirectionalLight(0xff8000, 0.5);
	light2.position.set(-1, 1, 0).normalize();
	scene.add(light2);
	// 点光源 青色
	let light3 = new THREE.PointLight(0x44FFAA, 15, 20);
	light3.position.set(0, -3, 0);
	scene.add(light3);
	// 点光源 橙色
	let light4 = new THREE.PointLight(0xff4400, 20, 20);
	light4.position.set(3, 3, 0);
	scene.add(light4);
	// 雾气效果，黑色，雾密度的增长速度 0.15
	scene.fog = new THREE.FogExp2(0x000000, 0.15);
	// 圆柱体模型,顶端半径，底端半径，高度，周长分割面，圆柱体高度分割面，圆柱体两端不覆盖
	let geometry = new THREE.CylinderGeometry(1, 1, 30, 32, 1, true);
	// 贴图
	let loader = new THREE.TextureLoader();
	let texture = loader.load("static/textures/water.jpg");
	// 纹理重复
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	// 圆柱体材质
	let material = new THREE.MeshLambertMaterial({
			color: 0xFFFFFF,
			map: texture,
			// 双面
			side: THREE.DoubleSide
	});
	// 圆柱对象
	let mesh = new THREE.Mesh(geometry, material);
	// X轴旋转 80 度，从圆柱底面往上看
	mesh.rotation.x = -Math.PI / 180 * 80;
	scene.add(mesh);
	// 渲染
	render();
	function render() {
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
			requestAnimationFrame(render);
	}

/***/ })
/******/ ]);