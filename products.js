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
    add(new THREE.CylinderGeometry(.115,.15,.42,24),plastic,0,.25,0,0,0,0,1,1,.88);
    add(new THREE.CylinderGeometry(.065,.085,.13,20),plastic,0,.51,0);
    add(new THREE.CylinderGeometry(.07,.07,.065,18),cap,0,.61,0);
    add(new THREE.BoxGeometry(.19,.12,.012),material(0xf3ead7,.48),0,.28,.135);
  } else if(name==='Doğranmış patates'){
    for(let i=0;i<14;i++){const fry=new THREE.Mesh(new THREE.BoxGeometry(.055,.07,.16),i%3?main:light);fry.position.set((i%4)*.09-.14,.05+Math.floor(i/4)*.045,(Math.floor(i/4)%2)*.08-.06);fry.rotation.y=(i%5)*.2;fry.castShadow=true;root.add(fry)}
  } else if(name==='Ekmek'){
    add(new THREE.SphereGeometry(.29,36,24),main,0,.035,0,0,0,0,1.48,.23,.9);
    add(new THREE.TorusGeometry(.265,.022,10,44),dark,0,.075,0,Math.PI/2,0,0,1.42,1,.84);
    const topGroup=new THREE.Group();topGroup.position.set(0,.075,-.29);root.add(topGroup);
    const top=new THREE.Mesh(new THREE.SphereGeometry(.29,36,24,0,Math.PI*2,0,Math.PI/2),light);top.scale.set(1.48,.32,.9);top.position.set(0,.015,.29);top.castShadow=true;topGroup.add(top);
    const sesame=material(0xf2e2b6,.58);
    for(let i=0;i<58;i++){const angle=i*2.399,rad=.06+Math.sqrt(i/58)*.245;const seed=new THREE.Mesh(new THREE.SphereGeometry(.008,7,5),sesame);seed.position.set(Math.cos(angle)*rad,.095,Math.sin(angle)*rad*.75);seed.rotation.z=Math.sin(angle)*.5;topGroup.add(seed)}
    root.userData.openBread=()=>{topGroup.rotation.x=-.82;topGroup.position.z=-.18};
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
    for(let pair=0;pair<2;pair++){const center=(pair-.5)*.18;for(let layer=0;layer<3;layer++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.105-layer*.018,.016,12,32),layer%2?light:main);ring.position.set(center+(layer-1)*.012,.075,0);ring.rotation.x=Math.PI/2;ring.scale.set(1,.9,1);ring.castShadow=true;root.add(ring)}}
    add(new THREE.SphereGeometry(.045,16,12),light,0,.05,0,0,0,0,1,.65,1);
  } else if(name==='Domates'){
    const sliceMat=material(0xd84a37,.42),skinMat=material(0xa92e25,.5),seedMat=material(0xf3d7a2,.6);
    for(let pair=0;pair<2;pair++){const center=(pair-.5)*.19;const slice=new THREE.Mesh(new THREE.CylinderGeometry(.135,.135,.045,36),sliceMat);slice.position.set(center,.075,0);slice.rotation.x=Math.PI/2;slice.castShadow=true;root.add(slice);const skin=new THREE.Mesh(new THREE.TorusGeometry(.12,.012,10,36),skinMat);skin.position.copy(slice.position);skin.rotation.copy(slice.rotation);root.add(skin);for(let j=0;j<8;j++){const seed=new THREE.Mesh(new THREE.SphereGeometry(.009,8,6),seedMat);seed.position.set(center+Math.cos(j*Math.PI/4)*.06,.10,Math.sin(j*Math.PI/4)*.06);root.add(seed)}}
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