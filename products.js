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
    const cooked=name==='Pişmiş tavuk';
    const meat=cooked?material(0xb87543,.66):material(0xe9b6a1,.7);
    const edge=cooked?material(0x70402b,.84):material(0xd18c78,.8);
    const sear=material(0x493022,.9),gold=cooked?material(0xd39a55,.72):meat;
    // Tantuni için küçük, yuvarlak ve düzensiz doğranmış tavuk parçaları.
    for(let i=0;i<22;i++){
      const a=i*2.399,r=.035+Math.sqrt((i+.5)/22)*.19;
      const piece=new THREE.Mesh(new THREE.SphereGeometry(.105,18,14),i%5===0?edge:(i%4===0?gold:meat));
      piece.position.set(Math.cos(a)*r,.052+(i%4)*.012,Math.sin(a)*r*.72);
      piece.rotation.set(.15+(i%3)*.16,a*.7,(i%5-2)*.2);
      piece.scale.set(.92+(i%3)*.14,.42+(i%4)*.07,.64+(i%2)*.16);
      piece.castShadow=true;piece.receiveShadow=true;root.add(piece);
      if(cooked&&i%2===0){
        for(let stripe=0;stripe<2;stripe++){
          const mark=new THREE.Mesh(new THREE.BoxGeometry(.014,.006,.058),sear);
          mark.position.set(piece.position.x+(stripe-.5)*.035,piece.position.y+.035,piece.position.z+(stripe-.5)*.018);
          mark.rotation.y=a*.7;root.add(mark);
        }
      }
    }

  } else if(name==='Marul'){
    const leafMat=material(0x659d43,.94),lightLeaf=material(0x83b653,.92),vein=material(0xb5ce82,.92);
    // Layered lettuce leaves with curled, rippled edges and raised central veins.
    for(let i=0;i<14;i++){
      const a=i*Math.PI*2/14,leaf=new THREE.Group();
      leaf.position.set(Math.cos(a)*(.035+(i%3)*.018),.025+(i%4)*.008,Math.sin(a)*(.035+(i%3)*.018));
      leaf.rotation.y=-a;leaf.rotation.z=Math.cos(a)*(.12+(i%4)*.045);
      const positions=[],indices=[],rows=16,cols=10;
      for(let r=0;r<=rows;r++){
        const t=r/rows,along=(t-.5)*.52,width=Math.sin(Math.PI*t)*(.045+(i%3)*.009);
        for(let c=0;c<=cols;c++){
          const u=c/cols*2-1,edge=Math.pow(Math.abs(u),1.7);
          const ripple=Math.sin(t*34+i*1.7+u*5.5)*.018*edge;
          const x=u*width+ripple;
          const y=.018+(1-u*u)*.045+Math.sin(t*29+i*1.2)*.009+edge*Math.sin(t*42+i)*.012;
          positions.push(x,y,along);
        }
      }
      for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const p=r*(cols+1)+c;indices.push(p,p+cols+1,p+1,p+1,p+cols+1,p+cols+2)}
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setIndex(indices);geo.computeVertexNormals();
      const mesh=new THREE.Mesh(geo,i%4===0?lightLeaf:leafMat);mesh.material.side=THREE.DoubleSide;mesh.castShadow=true;mesh.receiveShadow=true;leaf.add(mesh);
      const midrib=new THREE.Mesh(new THREE.CylinderGeometry(.004,.009,.43,6),vein);midrib.rotation.x=Math.PI/2;midrib.position.set(0,.062,0);leaf.add(midrib);
      root.add(leaf);
    }
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