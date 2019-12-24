function main(){
	const canvas = document.getElementById("container");
	const renderer = new THREE.WebGLRenderer({canvas});
	// renderer.setSize(window.innerWidth, window.innerHeight);
	// three.js中大多数的角用弧度表示
	const fov = 75;
	// canvas的显示比例
	const aspect = 2;
	// 摄像机前方将要被渲染的空间
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 2;
	// 创建一个Scene(场景)  Scene是three.js最基本的组成. 需要three.js绘制的东西都需要加入到scene中。
	const scene = new THREE.Scene();
	// 创建一盏平行光。
	{
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		scene.add(light);
	}
	// 创建一个包含盒子信息的BoxGeometry
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
	// 创建一个基本的材质并设置它的颜色
	// const material = new THREE.MeshBasicMaterial({color: 0xff00ff});

	// 改变材质。MeshBasicMaterial材质不会受到灯光的 影响。我们将他改成会受灯光影响的MeshPhongMaterial材质。
	// const material = new THREE.MeshPhongMaterial({color: 0xf0f0ff});

	// 创建一个Mesh. Mesh代表了Geometry(物体的形状)和Material (怎么 绘制物体, 光滑还是平整, 什么颜色, 什么贴图等等)的组合， 以及物体在场景中的位置、朝向、和缩放。
	// const cube = new THREE.Mesh(geometry, material);
	// 最后我们将mesh添加到场景中。
	// scene.add(cube);
	// 然后我们通过将scene和camera传递给renderer的render方法 来渲染整个场景。
	// renderer.render(scene, camera);
	
	// 创建一个根据指定的颜色生成新材质的函数
	function makeInstance(geometry, color, x){
		const material = new THREE.MeshPhongMaterial({color});
		const cube = new THREE.Mesh(geometry,material);
		scene.add(cube);
		cube.position.x = x;
		return cube; 
	}

	const cubes = [
		makeInstance(geometry, 0xff00fa, 0),
		makeInstance(geometry, 0x0000fa, -2),
		makeInstance(geometry, 0x00ff00, 2)
	];

	// 检查渲染器的canvas尺寸是不是和canvas的显示尺寸不一样 如果不一样就设置它。
	function resizeRendererToDisplaySize(renderer){
		const canvas = renderer.domElement;
		const pixelRatio = window.devicePixelRatio;
		const height = canvas.clientHeight * pixelRatio || 0;
		const width = canvas.clientWidth * pixelRatio || 0;
		const needResize = canvas.width !== width || canvas.height !== height;
		if(needResize){
			renderer.setSize(width, height, false);
		}

		return needResize;
	}

	// 渲染循环函数。
	function animation(time){
		time *= 0.001;
		
		// 只有canvas的显示尺寸变化时aspect值才变化所以我们 只在resizeRendererToDisplaySize函数返回true时才设置摄像机的aspect。
		if(resizeRendererToDisplaySize(renderer)){
		// 将相机的aspect设置为canvas的宽高比 解决拉伸问题
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}
		cubes.forEach((cube, ndx)=>{
			const speed = 1 + ndx * .1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot; 
		});
		renderer.render(scene, camera);
		requestAnimationFrame(animation);
	}
	requestAnimationFrame(animation);
}
main();