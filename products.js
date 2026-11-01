export function createProductModel(THREE, name, color) {
  const root=new THREE.Group();
  const material=(c,rough=.72)=>new THREE.MeshStandardMaterial({color:c,roughness:rough});
  const main=material(color,.72),light=material(new THREE.Color(color).multiplyScalar(1.16),.78),dark=material(new THREE.Color(color).multiplyScalar(.72),.82);
  const add=(geometry,mat,x,y,z,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1)=>{
    const mesh=new THREE.Mesh(geometry,mat);mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;
  };
  if(name==='Ketçap'||name==='Mayonez'||name==='Hardal'){
    const bottleColor=name==='Ketçap'?0xb82b22:name==='Mayonez'?0xe8dfc7:0xd6a21c;
    const plastic=material(bottleColor,.28),cap=material(0x24282b,.34);
    add(new THREE.CylinderGeometry(.12,.16,.43,24),plastic,0,.25,0,0,0,0,1,1,.9);
    add(new THREE.CylinderGeometry(.06,.085,.13,18),plastic,0,.52,0);
    add(new THREE.CylinderGeometry(.075,.075,.035,18),cap,0,.61,0);
    add(new THREE.ConeGeometry(.052,.13,18),plastic,0,.69,0);
    add(new THREE.CylinderGeometry(.012,.012,.018,10),cap,0,.765,0);
    add(new THREE.BoxGeometry(.19,.12,.012),material(0xf3ead7,.48),0,.28,.135);
  } else if(name==='Doğranmış patates'){
    for(let i=0;i<14;i++){const fry=new THREE.Mesh(new THREE.BoxGeometry(.055,.07,.16),i%3?main:light);fry.position.set((i%4)*.09-.14,.05+Math.floor(i/4)*.045,(Math.floor(i/4)%2)*.08-.06);fry.rotation.y=(i%5)*.2;fry.castShadow=true;root.add(fry)}
  } else if(name==='Ekmek'){
    const crumb=material(0xf0c77f,.88),crust=material(0xb87836,.72),toast=material(0xd99b4e,.78);
    add(new THREE.SphereGeometry(.29,32,22),crumb,0,.045,0,0,0,0,1.5,.27,.9);
    add(new THREE.TorusGeometry(.255,.026,8,36),crust,0,.085,0,Math.PI/2,0,0,1.43,1,.86);
    const topGroup=new THREE.Group();topGroup.position.set(0,.09,-.29);root.add(topGroup);
    const top=new THREE.Mesh(new THREE.SphereGeometry(.29,32,20,0,Math.PI*2,0,Math.PI/2),toast);top.scale.set(1.48,.34,.9);top.position.set(0,.015,.29);top.castShadow=true;topGroup.add(top);
    const sesame=material(0xf5e6c4,.62),seedGeo=new THREE.SphereGeometry(.009,6,5),seeds=new THREE.InstancedMesh(seedGeo,sesame,32),dummy=new THREE.Object3D();
    for(let i=0;i<32;i++){const angle=i*2.399,rad=.035+Math.sqrt((i+.5)/32)*.275;dummy.position.set(Math.cos(angle)*rad*1.48,.015+Math.sqrt(Math.max(.05,1-(rad/.29)**2))*.29*.34,Math.sin(angle)*rad*.9);dummy.rotation.z=Math.sin(angle)*.45;dummy.scale.set(1,.65,1);dummy.updateMatrix();seeds.setMatrixAt(i,dummy.matrix)}
    seeds.instanceMatrix.needsUpdate=true;topGroup.add(seeds);
    root.userData.openBread=()=>{topGroup.rotation.x=-.82;topGroup.position.z=-.18};
    root.userData.fillAnchor=new THREE.Vector3(0,.16,.02);
  } else if(name==='Çiğ tavuk'||name==='Pişmiş tavuk'){
    for(let i=0;i<12;i++){const a=i*2.399;add(new THREE.DodecahedronGeometry(.105,1),name==='Çiğ tavuk'?(i%3?main:light):(i%3?dark:main),Math.sin(a)*.16,.065+(i%3)*.012,Math.cos(a)*.14,Math.random()*.3,a*.2,(i%4-2)*.15,1.35,.72,.9)}
    add(new THREE.BoxGeometry(.48,.025,.42),dark,0,.012,0);
    if(name==='Pişmiş tavuk'){for(let i=0;i<7;i++)add(new THREE.BoxGeometry(.018,.014,.12),material(0x493021),-.2+i*.065,.14,Math.sin(i)*.12,0,0,(i-3)*.035);for(let i=0;i<5;i++)add(new THREE.SphereGeometry(.018,8,6),material(0x5b9b43),-.18+i*.09,.15,.18)}

  } else if(name==='Marul'){
    for(let i=0;i<12;i++){const a=i*Math.PI*2/12,leaf=new THREE.Mesh(new THREE.SphereGeometry(.17,20,14),i%3?main:light);leaf.position.set(Math.cos(a)*.105,.065+(i%3)*.018,Math.sin(a)*.105);leaf.scale.set(1.15,.22,.72);leaf.rotation.y=-a;leaf.rotation.z=Math.sin(a)*.18;leaf.castShadow=true;root.add(leaf)}
    add(new THREE.CylinderGeometry(.035,.055,.18,12),material(0xe9e1c6),0,.045,0);
    for(let i=0;i<7;i++)add(new THREE.BoxGeometry(.012,.008,.22),material(0x8acb68),Math.cos(i)*.05,.105,Math.sin(i)*.05,0,i*.45,0);
  } else if(name==='Soğan'){
    for(let pair=0;pair<2;pair++){const center=(pair-.5)*.18;for(let layer=0;layer<3;layer++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.105-layer*.018,.016,12,32),layer%2?light:main);ring.position.set(center+(layer-1)*.012,.075,0);ring.rotation.x=Math.PI/2;ring.scale.set(1,.9,1);ring.castShadow=true;root.add(ring)}}
    add(new THREE.SphereGeometry(.045,16,12),light,0,.05,0,0,0,0,1,.65,1);
  } else if(name==='Domates'){
    const sliceMat=material(0xd94632,.38),fleshMat=material(0xf27b60,.48),skinMat=material(0xa92e25,.5),seedMat=material(0xf7dfae,.55);
    for(let pair=0;pair<2;pair++){
      const center=(pair-.5)*.3,slice=new THREE.Mesh(new THREE.CylinderGeometry(.145,.145,.052,40),sliceMat);slice.position.set(center,.075,0);slice.castShadow=true;root.add(slice);
      const flesh=new THREE.Mesh(new THREE.CylinderGeometry(.112,.112,.008,36),fleshMat);flesh.position.set(center,.105,0);root.add(flesh);
      const skin=new THREE.Mesh(new THREE.TorusGeometry(.132,.014,8,40),skinMat);skin.position.set(center,.105,0);skin.rotation.x=Math.PI/2;root.add(skin);
      for(let j=0;j<6;j++){const a=j*Math.PI/3,seed=new THREE.Mesh(new THREE.SphereGeometry(.009,7,5),seedMat);seed.position.set(center+Math.cos(a)*.065,.114,Math.sin(a)*.065);seed.scale.set(1,.55,1);root.add(seed)}
    }
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