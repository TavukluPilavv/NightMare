export function createDeskPhone(THREE, mat) {
  const root = new THREE.Group();
  const add = (geometry, material, x, y, z, rx=0, ry=0, rz=0) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z); mesh.rotation.set(rx,ry,rz);
    mesh.castShadow = true; mesh.receiveShadow = true; root.add(mesh); return mesh;
  };
  const black=mat(0x171b20,.28,.35), edge=mat(0x343b42,.32,.45), screen=mat(0x263e42,.22,.25), key=mat(0xd8d1bd,.38);
  add(new THREE.BoxGeometry(.62,.16,.48),black,0,.08,0);
  add(new THREE.BoxGeometry(.64,.035,.5),edge,0,.16,0);
  add(new THREE.BoxGeometry(.36,.018,.12),screen,0,.185,-.12);
  for(let row=0;row<3;row++)for(let col=0;col<3;col++){
    add(new THREE.CylinderGeometry(.035,.035,.018,16),key,(col-1)*.105,.19,.015+row*.09);
  }
  add(new THREE.CylinderGeometry(.035,.035,.02,16),mat(0x4c8a56,.4),-.21,.19,.17);
  add(new THREE.CylinderGeometry(.035,.035,.02,16),mat(0xb64b43,.4),.21,.19,.17);
  const handset=add(new THREE.CapsuleGeometry(.065,.42,5,12),black,0,.34,-.02,0,0,Math.PI/2);
  handset.scale.set(1,.8,1);
  add(new THREE.SphereGeometry(.095,16,12),edge,-.27,.34,-.02);
  add(new THREE.SphereGeometry(.095,16,12),edge,.27,.34,-.02);
  const cordCurve=new THREE.CatmullRomCurve3([
    new THREE.Vector3(.26,.25,.05),new THREE.Vector3(.36,.18,.13),new THREE.Vector3(.34,.08,.18),
    new THREE.Vector3(.39,.04,.2),new THREE.Vector3(.35,.12,.24),new THREE.Vector3(.4,.2,.27)
  ]);
  add(new THREE.TubeGeometry(cordCurve,32,.012,6,false),black,0,0,0);
  root.userData.phoneHandset=handset;
  return root;
}

export function createMopModel(THREE, mat) {
  const root=new THREE.Group();
  const wood=mat(0x9b744b,.75), metal=mat(0x858d91,.35,.55), cloth=mat(0xd8d0bd,.95), dark=mat(0x8d806c,.9);
  const handle=new THREE.Mesh(new THREE.CylinderGeometry(.035,.045,1.35,12),wood);
  handle.position.set(0,.86,0);handle.castShadow=true;root.add(handle);
  const grip=new THREE.Mesh(new THREE.CylinderGeometry(.047,.047,.18,12),metal);
  grip.position.set(0,1.42,0);root.add(grip);
  const head=new THREE.Mesh(new THREE.BoxGeometry(.48,.11,.22),metal);
  head.position.set(0,.16,0);head.castShadow=true;root.add(head);
  for(let i=0;i<13;i++){
    const strand=new THREE.Mesh(new THREE.CylinderGeometry(.012,.018,.28,5),i%2?cloth:dark);
    strand.position.set((i-6)*.034,.005,(i%2-.5)*.11);
    strand.rotation.z=(i-6)*.018;strand.castShadow=true;root.add(strand);
  }
  root.rotation.z=-.16;
  return root;
}
