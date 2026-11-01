export function createProductModel(THREE, name, color) {
  const root=new THREE.Group();
  const material=(c,rough=.72)=>new THREE.MeshStandardMaterial({color:c,roughness:rough});
  const main=material(color,.72),light=material(new THREE.Color(color).multiplyScalar(1.16),.78),dark=material(new THREE.Color(color).multiplyScalar(.72),.82);
  const add=(geometry,mat,x,y,z,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1)=>{
    const mesh=new THREE.Mesh(geometry,mat);mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;
  };
  if(name==='Ekmek'){
    const left=new THREE.Group(),right=new THREE.Group();
    const halfA=new THREE.Mesh(new THREE.SphereGeometry(.22,24,16),main);halfA.scale.set(1.25,.58,.82);halfA.position.set(-.13,.07,0);left.add(halfA);
    const halfB=new THREE.Mesh(new THREE.SphereGeometry(.22,24,16),light);halfB.scale.set(1.25,.58,.82);halfB.position.set(.13,.07,0);right.add(halfB);
    root.add(left,right);root.userData.openBread=()=>{left.rotation.z=-.62;right.rotation.z=.62;left.position.x=-.08;right.position.x=.08};
    add(new THREE.BoxGeometry(.38,.025,.16),material(0xf2dcae),0,.015,.02);
  } else if(name==='Çiğ tavuk'||name==='Pişmiş tavuk'){
    for(let i=0;i<10;i++){const a=i*2.4;const c=name==='Çiğ tavuk'?(i%2?main:light):(i%3?dark:main);add(new THREE.CapsuleGeometry(.045,.15,3,7),c,Math.sin(a)*.16,.06,Math.cos(a)*.14,Math.random()*.25,a*.2,(i%4-2)*.15)}
    add(new THREE.BoxGeometry(.48,.035,.42),dark,0,0,0);
    if(name==='Pişmiş tavuk')for(let i=0;i<4;i++)add(new THREE.BoxGeometry(.025,.012,.18),material(0x5b9b43),-.18+i*.12,.13,.02,0,0,(i-2)*.08);
  } else if(name==='Marul'){
    for(let i=0;i<8;i++){const a=i*Math.PI*2/8;add(new THREE.SphereGeometry(.16,16,12),i%2?main:light,Math.cos(a)*.12,.08,Math.sin(a)*.12,0,0,a*.3,1.2,.32,.78)}
    add(new THREE.CylinderGeometry(.025,.035,.16,8),material(0xe9e1c6),0,.05,0);
  } else if(name==='Soğan'){
    for(let i=0;i<5;i++)add(new THREE.TorusGeometry(.15-i*.018,.025,10,24),i%2?main:light,(i-2)*.065,.07,0,Math.PI/2,0,0,1,1,.75);
    add(new THREE.SphereGeometry(.055,14,10),light,0,.05,0,0,0,0,1,.6,1);
  } else if(name==='Domates'){
    for(let i=0;i<4;i++){const a=i*Math.PI/2;add(new THREE.SphereGeometry(.13,18,14),i%2?light:main,Math.cos(a)*.12,.1,Math.sin(a)*.12,0,0,0,1,.9,1)}
    add(new THREE.ConeGeometry(.035,.08,5),material(0x3d7835),0,.24,0);
  } else if(name==='Patates'){
    const potato=material(0xe9cc91,.8),skin=material(0xc69b5d,.9);
    for(let i=0;i<9;i++){const a=(i-4)*.11;add(new THREE.BoxGeometry(.075,.075,.42),i%2?potato:skin,a,.045,(i%3-1)*.12,0,0,a*.25)}
  } else if(name==='Patates kızartması'){
    add(new THREE.BoxGeometry(.48,.24,.32),material(0xc64c2e),0,.02,0);
    for(let i=0;i<10;i++){const f=new THREE.Mesh(new THREE.BoxGeometry(.055,.38,.055),i%2?light:main);f.position.set((i%4)*.09-.14,.27,Math.floor(i/4)*.08-.08);f.rotation.z=(i%3-1)*.1;f.castShadow=true;root.add(f)}
  } else if(name==='Soğan halkası'){
    for(let i=0;i<5;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.13+i*.008,.035,10,24),i%2?light:main);ring.position.set((i-2)*.11,.08+(i%2)*.04,0);ring.rotation.x=Math.PI/2;ring.castShadow=true;root.add(ring)}
  }
  return root;
}