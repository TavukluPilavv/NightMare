export function createDeskPhone(THREE, mat) {
  const root = new THREE.Group();
  const add = (geometry, material, x, y, z, rx=0, ry=0, rz=0) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z); mesh.rotation.set(rx,ry,rz); mesh.castShadow=true; mesh.receiveShadow=true; root.add(mesh); return mesh;
  };
  const black=mat(0x171b20,.28,.35),edge=mat(0x343b42,.32,.45),screen=mat(0x263e42,.22,.25),key=mat(0xd8d1bd,.38);
  add(new THREE.BoxGeometry(.62,.16,.48),black,0,.08,0);add(new THREE.BoxGeometry(.64,.035,.5),edge,0,.16,0);
  add(new THREE.BoxGeometry(.36,.018,.12),screen,0,.185,-.12);
  for(let row=0;row<3;row++)for(let col=0;col<3;col++)add(new THREE.CylinderGeometry(.035,.035,.018,16),key,(col-1)*.105,.19,.015+row*.09);
  add(new THREE.CylinderGeometry(.035,.035,.02,16),mat(0x4c8a56,.4),-.21,.19,.17);
  add(new THREE.CylinderGeometry(.035,.035,.02,16),mat(0xb64b43,.4),.21,.19,.17);
  const handset=add(new THREE.CapsuleGeometry(.065,.42,5,12),black,0,.34,-.02,0,0,Math.PI/2);handset.scale.set(1,.8,1);
  add(new THREE.SphereGeometry(.095,16,12),edge,-.27,.34,-.02);add(new THREE.SphereGeometry(.095,16,12),edge,.27,.34,-.02);
  const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(.26,.25,.05),new THREE.Vector3(.36,.18,.13),new THREE.Vector3(.34,.08,.18),new THREE.Vector3(.39,.04,.2),new THREE.Vector3(.35,.12,.24),new THREE.Vector3(.4,.2,.27)]);
  add(new THREE.TubeGeometry(curve,32,.012,6,false),black,0,0,0);
  root.userData.handset=handset;return root;
}
export function createMopModel(THREE, mat) {
  const root=new THREE.Group(),wood=mat(0x9b744b,.75),metal=mat(0x858d91,.35,.55),cloth=mat(0xd8d0bd,.95),dark=mat(0x8d806c,.9);
  const handle=new THREE.Mesh(new THREE.CylinderGeometry(.035,.045,1.35,12),wood);handle.position.set(0,.86,0);handle.castShadow=true;root.add(handle);
  const grip=new THREE.Mesh(new THREE.CylinderGeometry(.047,.047,.18,12),metal);grip.position.set(0,1.42,0);root.add(grip);
  const head=new THREE.Mesh(new THREE.BoxGeometry(.48,.11,.22),metal);head.position.set(0,.16,0);head.castShadow=true;root.add(head);
  for(let i=0;i<13;i++){const strand=new THREE.Mesh(new THREE.CylinderGeometry(.012,.018,.28,5),i%2?cloth:dark);strand.position.set((i-6)*.034,.005,(i%2-.5)*.11);strand.rotation.z=(i-6)*.018;strand.castShadow=true;root.add(strand)}
  root.rotation.z=-.16;return root;
}
export function createPrepBoard(THREE, mat) {
 const g=new THREE.Group(),edge=mat(0x76502e,.75),wood=mat(0xc28b50,.82);
 const base=new THREE.Mesh(new THREE.BoxGeometry(1.65,.11,1.1),edge);base.position.y=.06;base.castShadow=true;g.add(base);
 const top=new THREE.Mesh(new THREE.BoxGeometry(1.58,.07,1.03),wood);top.position.y=.14;top.castShadow=true;g.add(top);
 for(let i=0;i<5;i++){const line=new THREE.Mesh(new THREE.BoxGeometry(.012,.003,.84),mat(0x9b6d3c));line.position.set(-.58+i*.29,.178,0);g.add(line)}
 return g;
}
export function createGrill(THREE, mat) {
 const g=new THREE.Group(),steel=mat(0x555d61,.35,.65),black=mat(0x171a1c,.65),grate=mat(0x9ba1a2,.3,.75);
 const base=new THREE.Mesh(new THREE.BoxGeometry(1.55,.5,1.05),steel);base.position.y=.25;base.castShadow=true;g.add(base);
 const hot=new THREE.Mesh(new THREE.BoxGeometry(1.35,.08,.84),black);hot.position.set(0,.55,0);g.add(hot);
 for(let i=0;i<11;i++){const bar=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.84,8),grate);bar.rotation.x=Math.PI/2;bar.position.set(-.6+i*.12,.62,0);g.add(bar)}
 for(const x of [-.5,.5]){const knob=new THREE.Mesh(new THREE.CylinderGeometry(.065,.065,.05,16),mat(0xc64b31,.35));knob.rotation.x=Math.PI/2;knob.position.set(x,.32,.54);g.add(knob)}
 return g;
}
export function createFryer(THREE, mat) {
 const g=new THREE.Group(),steel=mat(0x747f84,.32,.55),dark=mat(0x20272b,.62),oil=mat(0xb18a3f,.28);
 const body=new THREE.Mesh(new THREE.BoxGeometry(1.35,.85,1.05),steel);body.position.y=.42;body.castShadow=true;g.add(body);
 const vat=new THREE.Mesh(new THREE.BoxGeometry(.92,.1,.7),dark);vat.position.set(0,.9,0);g.add(vat);
 const liquid=new THREE.Mesh(new THREE.BoxGeometry(.78,.025,.55),oil);liquid.position.set(0,.96,0);g.add(liquid);
 for(let i=0;i<2;i++){const basket=new THREE.Mesh(new THREE.BoxGeometry(.32,.32,.42),mat(0xabb1b1,.4,.7));basket.position.set(i?-.23:.23,1.12,0);g.add(basket)}
 const dial=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.06,16),mat(0x282d31));dial.rotation.x=Math.PI/2;dial.position.set(0,.45,.55);g.add(dial);
 return g;
}
export function createTrashBin(THREE, mat) {
 const g=new THREE.Group(),body=mat(0x34434a,.75),lid=mat(0x20292e,.55);
 const bin=new THREE.Mesh(new THREE.CylinderGeometry(.34,.29,.82,20),body);bin.position.y=.41;bin.castShadow=true;g.add(bin);
 const top=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,.09,20),lid);top.position.y=.85;g.add(top);
 const hole=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.012,20),mat(0x090d10));hole.position.y=.902;g.add(hole);return g;
}
export function createSauceBottle(THREE,color) {
 const g=new THREE.Group(),plastic=new THREE.MeshStandardMaterial({color,roughness:.28});
 const bottle=new THREE.Mesh(new THREE.CylinderGeometry(.12,.16,.48,20),plastic);bottle.position.y=.25;bottle.castShadow=true;g.add(bottle);
 const neck=new THREE.Mesh(new THREE.CylinderGeometry(.055,.075,.12,16),plastic);neck.position.y=.55;g.add(neck);
 const cap=new THREE.Mesh(new THREE.CylinderGeometry(.065,.065,.07,16),new THREE.MeshStandardMaterial({color:0x252525}));cap.position.y=.645;g.add(cap);return g;
}