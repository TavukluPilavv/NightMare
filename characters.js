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
  const add=(geo,m,x,y,z,parent=group)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o};
  if(role==="pedestrian"){
    const skin=mat(skins[variant%skins.length]),shirt=mat(shirts[variant%shirts.length]),pants=mat([0x20242a,0x34302c,0x303b4b,0x4a3831][variant%4]),hair=mat(hairColors[variant%hairColors.length]),shoe=mat(0x17191c,.72);
    const torso=add(new THREE.CapsuleGeometry(.27,.58,4,8),shirt,0,1.12,0);torso.scale.set(1,.96,.72);
    const head=add(new THREE.SphereGeometry(.235,12,9),skin,0,1.82,0);head.scale.set(.94,1.08,.96);
    add(new THREE.SphereGeometry(.245,12,8,0,Math.PI*2,0,Math.PI*.55),hair,0,1.9,.012);
    const arms=[],legs=[];
    for(const x of [-.35,.35]){const pivot=new THREE.Group();pivot.position.set(x,1.38,0);group.add(pivot);const arm=add(new THREE.CapsuleGeometry(.07,.48,3,7),shirt,0,-.29,0,pivot);arms.push(pivot);add(new THREE.SphereGeometry(.07,8,6),skin,0,-.57,-.01,pivot)}
    for(const x of [-.14,.14]){const pivot=new THREE.Group();pivot.position.set(x,.72,0);group.add(pivot);add(new THREE.CapsuleGeometry(.08,.42,3,7),pants,0,-.28,0,pivot);add(new THREE.BoxGeometry(.17,.1,.27),shoe,0,-.59,-.045,pivot);legs.push(pivot)}
    for(const x of [-.085,.085]){const eye=add(new THREE.SphereGeometry(.018,7,5),mat(0x171311),x,1.84,-.218);eye.scale.set(1,.8,.5)}
    group.userData={strange:false,variant,role,arms,legs,walkPhase:Math.random()*6,baseYaw:0,animate:(time,walking=false)=>{const phase=time*8.5+group.userData.walkPhase,swing=walking?Math.sin(phase)*.52:Math.sin(time*1.5)*.025;arms[0].rotation.x=swing;arms[1].rotation.x=-swing;legs[0].rotation.x=-swing*.85;legs[1].rotation.x=swing*.85;group.position.y=walking?Math.abs(Math.sin(phase*2))*.025:0;group.rotation.y=(group.userData.baseYaw||0)+Math.sin(time*.9+variant)*.018}};
    return group;
  }
  const torso=add(new THREE.CapsuleGeometry(.29+(variant%3)*.025,.56+(variant%2)*.1,6,16),shirt,0,1.13,0);torso.scale.set(1,.98,.72);
  const neck=add(new THREE.CylinderGeometry(.095,.12,.18,14),skin,0,1.64,0);
  const head=new THREE.Group();head.position.set(0,1.83,0);group.add(head);
  const skull=add(new THREE.SphereGeometry(.255,32,24),skin,0,1.83,0);head.add(skull);skull.position.set(0,0,0);skull.scale.set(.94,1.08,.96);
  for(const x of [-.245,.245]){const ear=add(new THREE.SphereGeometry(.065,14,10),skin,x,-.015,-.005);ear.scale.set(.72,1.05,.72);head.add(ear)}
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
    const browMesh=add(new THREE.CapsuleGeometry(.012,.07,3,7),brow,x,.092,-.225);browMesh.rotation.z=x<0?-.12:.12;head.add(browMesh);brows.push(browMesh);
  }
  const mouth=add(new THREE.CapsuleGeometry(.012,.075,3,8),mat(strange?0x18070b:0x713d37),0,-.105,-.235);mouth.rotation.z=Math.PI/2;head.add(mouth);
  const nose=add(new THREE.SphereGeometry(.035,12,9),skin,0,-.035,-.245);nose.scale.set(.75,.8,.8);head.add(nose);
  for(const x of [-.39,.39]){
    add(new THREE.SphereGeometry(.13,16,12),shirt,x,1.39,0);
    const armPivot=new THREE.Group();armPivot.position.set(x,1.38,0);group.add(armPivot);
    const arm=new THREE.Mesh(new THREE.CapsuleGeometry(.078,.54,6,12),shirt);arm.position.set(0,-.31,0);arm.castShadow=true;armPivot.add(arm);arms.push(armPivot);
    const elbow=new THREE.Mesh(new THREE.SphereGeometry(.078,12,10),shirt);elbow.position.set(0,-.57,0);armPivot.add(elbow);
    const hand=new THREE.Mesh(new THREE.SphereGeometry(.082,16,12),skin);hand.position.set(0,-.68,-.018);hand.scale.set(.92,1.08,.9);armPivot.add(hand);hands.push(hand);
    for(let finger=0;finger<4;finger++){const digit=new THREE.Mesh(new THREE.CapsuleGeometry(.012,.055,3,6),skin);digit.position.set((finger-1.5)*.027,-.755,-.045);digit.rotation.x=-.22;armPivot.add(digit)}
  }
  for(const x of [-.16,.16]){
    const hip=new THREE.Group();hip.position.set(x,.72,0);group.add(hip);
    const leg=new THREE.Mesh(new THREE.CapsuleGeometry(.085,.43,6,12),pants);leg.position.set(0,-.3,0);leg.castShadow=true;hip.add(leg);legs.push(hip);
    const knee=new THREE.Mesh(new THREE.SphereGeometry(.086,12,10),pants);knee.position.set(0,-.52,-.005);hip.add(knee);
    const foot=new THREE.Mesh(new THREE.BoxGeometry(.19,.12,.32),shoe);foot.position.set(0,-.65,-.055);foot.rotation.y=x*.2;foot.castShadow=true;hip.add(foot);
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
  group.userData.animate=(time,walking=false,dt=1/60)=>{
    const phase=time*9.2+group.userData.walkPhase;
    const swing=walking?Math.sin(phase)*.58:Math.sin(time*1.6+group.userData.walkPhase)*.035;
    arms[0].rotation.x=swing;arms[1].rotation.x=-swing;
    arms[0].rotation.z=-.12+Math.max(0,Math.sin(phase))*.12;
    arms[1].rotation.z=.12-Math.max(0,Math.sin(phase+Math.PI))*.12;
    legs[0].rotation.x=-swing*.82;legs[1].rotation.x=swing*.82;
    group.position.y=walking?Math.abs(Math.sin(phase*2))*.035:Math.sin(time*1.8+group.userData.walkPhase)*.008;torso.rotation.z=walking?Math.sin(phase)*.025:Math.sin(time*.7)*.008;neck.rotation.z=Math.sin(time*.9+variant)*.025;
    group.rotation.y=(group.userData.baseYaw||0)+Math.sin(time*1.1+variant)*.025;
    head.rotation.y=Math.sin(time*.8+variant)*.06;
    group.userData.blinkAt-=dt;
    if(group.userData.blinkAt<=0){group.userData.blink=.16;group.userData.blinkAt=2.2+Math.random()*4}
    if(group.userData.blink>0){group.userData.blink-=dt;const shut=group.userData.blink>.055?1:Math.max(.05,group.userData.blink/.055);lids.forEach(l=>{l.scale.y=1+(1-shut)*13;l.position.y=.055-(1-shut)*.018})}
    else lids.forEach(l=>{l.scale.y=1;l.position.y=.055});
  };
  if(strange)group.userData.setExpression("angry");
  return group;
}
