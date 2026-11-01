export function createProductModel(THREE, name, color) {
  const root=new THREE.Group();
  const material=(c,rough=.72)=>new THREE.MeshStandardMaterial({color:c,roughness:rough});
  const main=material(color,.72),light=material(new THREE.Color(color).multiplyScalar(1.16),.78),dark=material(new THREE.Color(color).multiplyScalar(.72),.82);
  const add=(geometry,mat,x,y,z,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1)=>{
    const mesh=new THREE.Mesh(geometry,mat);mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;
  };
  if(name==='Ekmek'){
    add(new THREE.SphereGeometry(.27,32,22),main,0,.035,0,0,0,0,1.42,.22,.88);
    add(new THREE.TorusGeometry(.255,.025,10,36),dark,0,.075,0,Math.PI/2,0,0,1.35,1,.82);
    const flap=new THREE.Group();flap.position.set(0,.075,-.28);root.add(flap);
    const top=new THREE.Mesh(new THREE.SphereGeometry(.27,32,20,0,Math.PI*2,0,Math.PI/2),light);top.scale.set(1.42,.30,.88);top.position.set(0,.015,.28);top.castShadow=true;flap.add(top);
    for(let i=0;i<18;i++){const seed=new THREE.Mesh(new THREE.SphereGeometry(.009,7,5),material(0x9b7040));seed.position.set(Math.sin(i*7.3)*.30,.094,Math.cos(i*4.1)*.19);flap.add(seed)}
    root.userData.openBread=()=>{flap.rotation.x=-.9;flap.position.z=-.18};
    root.userData.fillAnchor=new THREE.Vector3(0,.15,.02);
  } else if(name==='Çiğ tavuk'||name==='Pişmiş tavuk'){
    for(let i=0;i<12;i++){const a=i*2.399;add(new THREE.DodecahedronGeometry(.105,1),name==='Çiğ tavuk'?(i%3?main:light):(i%3?dark:main),Math.sin(a)*.16,.065+(i%3)*.012,Math.cos(a)*.14,Math.random()*.3,a*.2,(i%4-2)*.15,1.35,.72,.9)}
    add(new THREE.BoxGeometry(.48,.025,.42),dark,0,.012,0);
    if(name==='Pişmiş tavuk'){for(let i=0;i<7;i++)add(new THREE.BoxGeometry(.018,.014,.12),material(0x493021),-.2+i*.065,.14,Math.sin(i)*.12,0,0,(i-3)*.035);for(let i=0;i<5;i++)add(new THREE.SphereGeometry(.018,8,6),material(0x5b9b43),-.18+i*.09,.15,.18)}

  } else if(name==='Marul'){
    for(let i=0;i<12;i++){const a=i*Math.PI*2/12,leaf=new THREE.Mesh(new THREE.SphereGeometry(.17,20,14),i%3?main:light);leaf.position.set(Math.cos(a)*.105,.065+(i%3)*.018,Math.sin(a)*.105);leaf.scale.set(1.15,.22,.72);leaf.rotation.y=-a;leaf.rotation.z=Math.sin(a)*.18;leaf.castShadow=true;root.add(leaf)}
    add(new THREE.CylinderGeometry(.035,.055,.18,12),material(0xe9e1c6),0,.045,0);
    for(let i=0;i<7;i++)add(new THREE.BoxGeometry(.012,.008,.22),material(0x8acb68),Math.cos(i)*.05,.105,Math.sin(i)*.05,0,i*.45,0);
  } else if(name==='Soğan'){
    for(let layer=0;layer<4;layer++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.16-layer*.022,.018,12,36),layer%2?light:main);ring.position.set((layer-1.5)*.045,.075,0);ring.rotation.x=Math.PI/2;ring.rotation.z=layer*.12;ring.scale.set(1,.82,1);ring.castShadow=true;root.add(ring)}
    add(new THREE.SphereGeometry(.045,16,12),light,0,.05,0,0,0,0,1,.65,1);
  } else if(name==='Domates'){
    const sliceMat=material(0xd84a37,.48),skinMat=material(0xa92e25,.55),seedMat=material(0xf3d7a2,.62);
    for(let i=0;i<3;i++){const slice=new THREE.Mesh(new THREE.CylinderGeometry(.17,.17,.045,32),sliceMat);slice.position.set((i-1)*.13,.075+(i%2)*.025,0);slice.rotation.x=Math.PI/2;slice.castShadow=true;root.add(slice);const skin=new THREE.Mesh(new THREE.TorusGeometry(.15,.012,8,32),skinMat);skin.position.copy(slice.position);skin.rotation.copy(slice.rotation);root.add(skin);for(let j=0;j<6;j++){const seed=new THREE.Mesh(new THREE.SphereGeometry(.012,8,6),seedMat);seed.position.set(slice.position.x+Math.cos(j*Math.PI/3)*.075,.10+(i%2)*.025,Math.sin(j*Math.PI/3)*.075);root.add(seed)}}
  } else if(name==='Patates'){
    const skin=material(0xb88a50,.92),eye=material(0x725033,.98);
    for(let i=0;i<3;i++){const tuber=new THREE.Mesh(new THREE.SphereGeometry(.17,24,18),i%2?main:skin);tuber.position.set((i-1)*.18,.08,Math.sin(i*2)*.08);tuber.scale.set(1.35,.72,.82);tuber.rotation.z=(i-1)*.2;tuber.castShadow=true;tuber.receiveShadow=true;root.add(tuber);for(let j=0;j<4;j++){const spot=new THREE.Mesh(new THREE.SphereGeometry(.012,7,5),eye);spot.position.set(tuber.position.x+Math.sin(j*3.2)*.13,.08+Math.cos(j*2.4)*.055,tuber.position.z+Math.cos(j*3.2)*.09);root.add(spot)}}
  } else if(name==='Patates kızartması'){
    add(new THREE.BoxGeometry(.48,.24,.32),material(0xc64c2e),0,.02,0);
    for(let i=0;i<10;i++){const f=new THREE.Mesh(new THREE.BoxGeometry(.055,.38,.055),i%2?light:main);f.position.set((i%4)*.09-.14,.27,Math.floor(i/4)*.08-.08);f.rotation.z=(i%3-1)*.1;f.castShadow=true;root.add(f)}
  } else if(name==='Soğan halkası'){
    for(let i=0;i<5;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.13+i*.008,.035,10,24),i%2?light:main);ring.position.set((i-2)*.11,.08+(i%2)*.04,0);ring.rotation.x=Math.PI/2;ring.castShadow=true;root.add(ring)}
  }
  return root;
}