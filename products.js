export function createProductModel(THREE, name, color) {
  const root=new THREE.Group();
  const material=(c,rough=.7)=>new THREE.MeshStandardMaterial({color:c,roughness:rough});
  const main=material(color,.72), light=material(new THREE.Color(color).multiplyScalar(1.16),.78), dark=material(new THREE.Color(color).multiplyScalar(.72),.82);
  const add=(geometry,mat,x,y,z,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1)=>{
    const mesh=new THREE.Mesh(geometry,mat);mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;
  };
  if(name==='Ekmek'){
    add(new THREE.SphereGeometry(.24,24,16),main,0,.08,0,0,0,0,1.45,.68,.9);
    add(new THREE.SphereGeometry(.19,20,14),light,0,.17,0,0,0,0,1.35,.34,.85);
    for(let i=-3;i<=3;i++)add(new THREE.BoxGeometry(.018,.012,.15),dark,i*.06,.22,0,0,0,.12);
    add(new THREE.SphereGeometry(.08,16,10),material(0xf2dcae),0,.06,.12,0,0,0,1,.5,.5);
  } else if(name==='Tavuk tantuni'){
    add(new THREE.BoxGeometry(.6,.055,.5),dark,0,0,0);
    for(let i=0;i<11;i++){const a=i*2.4;add(new THREE.CapsuleGeometry(.045,.16,3,7),i%3===0?light:main,Math.sin(a)*.16,.07,Math.cos(a)*.15,Math.random()*.3, a*.2,(i%4-2)*.15);}
    for(let i=0;i<4;i++)add(new THREE.BoxGeometry(.025,.012,.22),material(0x5b9b43),-.2+i*.13,.13,.02,0,0,(i-2)*.08);
  } else if(name==='Marul'){
    for(let i=0;i<7;i++){const a=i*Math.PI*2/7;add(new THREE.SphereGeometry(.16,16,12),i%2?main:light,Math.cos(a)*.12,.08,Math.sin(a)*.12,0,0,a*.3,1.2,.32,.78);}
    add(new THREE.CylinderGeometry(.025,.035,.16,8),material(0xe9e1c6),0,.05,0);
  } else if(name==='Soğan'){
    for(let i=0;i<5;i++)add(new THREE.TorusGeometry(.15-i*.018,.025,10,24),i%2?main:light,(i-2)*.065,.07,0,Math.PI/2,0,0,1,1,.75);
    add(new THREE.SphereGeometry(.055,14,10),light,0,.05,0,0,0,0,1,.6,1);
  } else if(name==='Çiğ patates'){
    const potato=material(0xe9cc91,.8),skin=material(0xc69b5d,.9);
    for(let i=0;i<9;i++){const a=(i-4)*.11;add(new THREE.BoxGeometry(.075,.075,.42),i%2?potato:skin,a,.045,(i%3-1)*.12,0,0,a*.25);}
  }
  return root;
}
