export function createHumanCustomer(THREE, options = {}) {
  const { strange=false, variant=Math.floor(Math.random()*8), role="customer" }=options;
  const group=new THREE.Group();
  const mat=(color,roughness=.82,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
  const skins=[0xc58b68,0xe2b18e,0x8a5b43,0xf0c9a4,0xb87955,0xd29c77,0x9a6b52,0xdcb59a];
  const shirts=[0x245c91,0x477a45,0x8a3e36,0x76529a,0xb07828,0x34495b,0x9c5b37,0x426b70];
  const hairColors=[0x21150f,0x493020,0x17191d,0x9b6335,0x302b28,0x66513b];
  const skin=mat(strange?0xc8c3bd:skins[variant%skins.length]);
  const shirt=mat(strange?0x171319:(role==="courier"?0x273d32:shirts[variant%shirts.length]));
  const pants=mat([0x20242a,0x34302c,0x303b4b,0x4a3831][variant%4]);
  const hair=mat(strange?0x050508:hairColors[variant%hairColors.length]);
  const shoe=mat(0x17191c,.72), eyeWhite=mat(0xf2eee7,.3), iris=mat(strange?0x9e101c:0x493326,.28), pupil=mat(0x09090b,.18), brow=mat(strange?0x080609:0x30221c);
  const add=(geo,m,x,y,z)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;group.add(o);return o};
  const torso=add(new THREE.CapsuleGeometry(.29+(variant%3)*.025,.56+(variant%2)*.1,6,16),shirt,0,1.13,0);torso.scale.set(1,.98,.72);
  const neck=add(new THREE.CylinderGeometry(.095,.12,.18,14),skin,0,1.64,0);
  const head=new THREE.Group();head.position.set(0,1.83,0);group.add(head);
  const skull=add(new THREE.SphereGeometry(.255,28,22),skin,0,1.83,0);head.add(skull);skull.position.set(0,0,0);
  const hairCap=add(new THREE.SphereGeometry(.265,24,16,0,Math.PI*2,0,Math.PI*.58),hair,0,.055,.015);head.add(hairCap);
  if(variant%3===1){const fringe=add(new THREE.BoxGeometry(.42,.075,.16),hair,0,-.025,-.205);head.add(fringe)}
  if(variant%3===2){const beard=add(new THREE.SphereGeometry(.16,18,12),hair,0,-.15,-.16);beard.scale.set(1,.62,.48);head.add(beard)}
  const eyes=[],lids=[],brows=[],arms=[],legs=[],hands=[];
  for(const x of [-.105,.105]){
    const eyeGroup=new THREE.Group();eyeGroup.position.set(x,.015,-.224);head.add(eyeGroup);
    const white=add(new THREE.SphereGeometry(.047,16,12),eyeWhite,0,0,0);white.scale.set(1,.7,.48);eyeGroup.add(white);
    const irisMesh=add(new THREE.SphereGeometry(.022,14,10),iris,0,0,-.018);eyeGroup.add(irisMesh);
    const pupilMesh=add(new THREE.SphereGeometry(.011,12,8),pupil,0,0,-.027);eyeGroup.add(pupilMesh);
    const lid=add(new THREE.BoxGeometry(.105,.004,.012),skin,0,.055,-.022);eyeGroup.add(lid);lids.push(lid);eyes.push(eyeGroup);
    const browMesh=add(new THREE.CapsuleGeometry(.012,.07,3,7),brow,x,.092,-.225);browMesh.rotation.z=x<0?-.12:.12;brows.push(browMesh);
  }
  const mouth=add(new THREE.CapsuleGeometry(.012,.075,3,8),mat(strange?0x18070b:0x713d37),0,-.105,-.235);mouth.rotation.z=Math.PI/2;
  const nose=add(new THREE.SphereGeometry(.035,12,9),skin,0,-.035,-.245);nose.scale.set(.75,.8,.8);
  for(const x of [-.39,.39]){
    const shoulder=add(new THREE.SphereGeometry(.13,14,10),shirt,x,1.39,0);
    const arm=add(new THREE.CapsuleGeometry(.075,.48,5,10),shirt,x,1.12,0);arm.rotation.z=x<0?-.12:.12;arms.push(arm);
    const hand=add(new THREE.SphereGeometry(.085,14,10),skin,x,.81,-.015);hands.push(hand);
  }
  for(const x of [-.16,.16]){
    const leg=add(new THREE.CapsuleGeometry(.085,.43,5,10),pants,x,.39,0);legs.push(leg);
    const foot=add(new THREE.BoxGeometry(.19,.12,.32),shoe,x,.075,-.045);foot.rotation.y=x*.2;
  }
  if(role==="courier"){
    add(new THREE.BoxGeometry(.52,.62,.22),mat(0xb74627),0,1.08,.28);
    const helmet=mat(0xe7b52d,.3,.25),visor=mat(0x26333c,.22,.35),strap=mat(0x22262b,.5);
    const shell=add(new THREE.SphereGeometry(.29,24,16,0,Math.PI*2,0,Math.PI*.58),helmet,0,.17,0);shell.scale.set(1.08,.78,1.12);head.add(shell);
    const brim=add(new THREE.TorusGeometry(.235,.025,8,28),helmet,0,.075,-.015);brim.scale.set(1.12,.85,1);head.add(brim);
    const faceShield=add(new THREE.BoxGeometry(.37,.09,.035),visor,0,.035,-.245);head.add(faceShield);
    const chin=add(new THREE.CapsuleGeometry(.012,.28,3,8),strap,0,-.17,-.05);chin.rotation.z=Math.PI/2;head.add(chin);
  }
  group.userData={strange,variant,role,arms,legs,hands,head,eyes,lids,brows,mouth,walkPhase:Math.random()*6,blinkAt:1.5+Math.random()*3,blink:0,expression:0};
  group.userData.setExpression=(kind="neutral")=>{
    const angry=kind==="angry"||strange,smile=kind==="happy";
    brows.forEach((b,i)=>{b.rotation.z=(i===0?-1:1)*(angry?.42:.12)});
    mouth.scale.y=smile?1.55:angry?1.3:1;
    mouth.scale.x=smile?1.2:1;
    group.userData.expression=kind;
  };
  group.userData.animate=(time,walking=false)=>{
    const phase=time*7+group.userData.walkPhase;
    const swing=walking?Math.sin(phase)*.48:Math.sin(time*1.6+group.userData.walkPhase)*.025;
    arms[0].rotation.x=swing;arms[1].rotation.x=-swing;
    arms[0].rotation.z=-.12+Math.max(0,Math.sin(phase))*.12;
    arms[1].rotation.z=.12-Math.max(0,Math.sin(phase+Math.PI))*.12;
    legs[0].rotation.x=-swing*.82;legs[1].rotation.x=swing*.82;
    group.position.y=walking?Math.abs(Math.sin(phase*2))*.035:Math.sin(time*1.8+group.userData.walkPhase)*.008;
    group.rotation.y=Math.sin(time*1.1+variant)*.025;
    head.rotation.y=Math.sin(time*.8+variant)*.045;
    group.userData.blinkAt-=.016;
    if(group.userData.blinkAt<=0){group.userData.blink=.16;group.userData.blinkAt=2.2+Math.random()*4}
    if(group.userData.blink>0){group.userData.blink-=.016;const shut=group.userData.blink>.055?1:Math.max(.05,group.userData.blink/.055);lids.forEach(l=>{l.scale.y=1+(1-shut)*13;l.position.y=.055-(1-shut)*.018})}
    else lids.forEach(l=>{l.scale.y=1;l.position.y=.055});
  };
  if(strange)group.userData.setExpression("angry");
  return group;
}
