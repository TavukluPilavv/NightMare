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