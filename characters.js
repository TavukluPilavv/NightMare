export function createHumanCustomer(THREE, options = {}) {
  const { strange = false, variant = Math.floor(Math.random() * 8), role = "customer" } = options;
  const group = new THREE.Group();
  const mat = (color, roughness = .82) => new THREE.MeshStandardMaterial({ color, roughness });
  const skins = [0xc58b68,0xe2b18e,0x8a5b43,0xf0c9a4,0xb87955,0xd29c77,0x9a6b52,0xdcb59a];
  const shirts = [0x245c91,0x477a45,0x8a3e36,0x76529a,0xb07828,0x34495b,0x9c5b37,0x426b70];
  const hairColors = [0x21150f,0x493020,0x17191d,0x9b6335,0x302b28,0x66513b];
  const skin = mat(strange ? 0xd4d1c8 : skins[variant % skins.length]);
  const shirt = mat(strange ? 0x171319 : (role === "courier" ? 0x273d32 : shirts[variant % shirts.length]));
  const pants = mat([0x20242a,0x34302c,0x303b4b,0x4a3831][variant % 4]);
  const hair = mat(strange ? 0x050508 : hairColors[variant % hairColors.length]);
  const add = (geo, material, x, y, z, cast = true) => {
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x,y,z); mesh.castShadow = cast; mesh.receiveShadow = true;
    group.add(mesh); return mesh;
  };
  const torso = add(new THREE.CapsuleGeometry(.29 + (variant % 3)*.025, .56 + (variant % 2)*.1, 5, 12), shirt, 0, 1.13, 0);
  torso.scale.set(1,.98,.72);
  add(new THREE.SphereGeometry(.255,20,16), skin, 0, 1.78, 0);
  add(new THREE.SphereGeometry(.27,18,12,0,Math.PI*2,0,Math.PI/2), hair, 0, 1.96, 0);
  if (variant % 3 === 1) add(new THREE.BoxGeometry(.52,.05,.3), hair, 0, 1.88, -.1);
  if (variant % 3 === 2) { const beard=add(new THREE.SphereGeometry(.16,14,10),hair,0,1.61,-.17); beard.scale.set(1,.7,.6); }
  const eyes = mat(strange ? 0xff1028 : 0x211810, .35);
  for (const x of [-.105,.105]) {
    add(new THREE.SphereGeometry(strange ? .052 : .032,12,10), eyes, x,1.81,-.235);
  }
  const arms = [];
  for (const x of [-.39,.39]) {
    const arm=add(new THREE.CapsuleGeometry(.085,.48,4,8),shirt,x,1.12,0);
    arm.rotation.z=x<0?-.12:.12; arms.push(arm);
    add(new THREE.SphereGeometry(.09,12,10),skin,x,.81,-.015);
  }
  for (const x of [-.16,.16]) {
    add(new THREE.BoxGeometry(.16,.58,.19),pants,x,.38,0);
    add(new THREE.BoxGeometry(.18,.12,.31),mat(0x17191c),x,.075,-.035);
  }
  group.userData = { strange, variant, role, arms, walkPhase: Math.random()*6 };
  group.userData.animate = (time, walking = false) => {
    const swing = walking ? Math.sin(time*7 + group.userData.walkPhase)*.42 : Math.sin(time*1.8 + group.userData.walkPhase)*.025;
    arms[0].rotation.x = swing; arms[1].rotation.x = -swing;
    group.rotation.y = Math.sin(time*1.4 + variant)*.035;
  };
  return group;
}
