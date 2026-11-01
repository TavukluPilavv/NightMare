let context=null,master=null,ambience=null,phoneRingTimer=null;
function audioContext(){
 if(!context){context=new (window.AudioContext||window.webkitAudioContext)();master=context.createGain();master.gain.value=.72;master.connect(context.destination)}
 if(context.state==='suspended')context.resume();return context;
}
export function playTone(frequency=440,duration=.14,type='sine',volume=.045){
 try{const c=audioContext(),osc=c.createOscillator(),gain=c.createGain();osc.type=type;osc.frequency.setValueAtTime(frequency,c.currentTime);gain.gain.setValueAtTime(volume,c.currentTime);gain.gain.exponentialRampToValueAtTime(.001,c.currentTime+duration);osc.connect(gain);gain.connect(master);osc.start();osc.stop(c.currentTime+duration)}catch{}
}
export function playNoise(duration=.3,volume=.025,filter=900){
 try{const c=audioContext(),length=Math.floor(c.sampleRate*duration),buffer=c.createBuffer(1,length,c.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);const source=c.createBufferSource(),low=c.createBiquadFilter(),gain=c.createGain();source.buffer=buffer;low.type='lowpass';low.frequency.value=filter;gain.gain.value=volume;source.connect(low);low.connect(gain);gain.connect(master);source.start()}catch{}
}
export function playDoor(){playTone(180,.12,'triangle',.06);playNoise(.12,.018,500)}
export function playFryer(){playNoise(.8,.045,1800)}
export function playScare(){playTone(48,.85,'sawtooth',.18);setTimeout(()=>playTone(920,.28,'square',.1),110);playNoise(.7,.1,1200)}
export function playCustomerVoice(strange=false){
 try{const c=audioContext(),now=c.currentTime,base=strange?92:145+Math.random()*45,osc=c.createOscillator(),formant=c.createBiquadFilter(),gain=c.createGain();osc.type=strange?'sawtooth':'triangle';osc.frequency.setValueAtTime(base,now);osc.frequency.exponentialRampToValueAtTime(base*(strange?1.8:1.35),now+.16);formant.type='bandpass';formant.frequency.value=strange?420:760;formant.Q.value=2.2;gain.gain.setValueAtTime(.001,now);gain.gain.linearRampToValueAtTime(strange?.035:.018,now+.035);gain.gain.exponentialRampToValueAtTime(.001,now+.23);osc.connect(formant);formant.connect(gain);gain.connect(master);osc.start(now);osc.stop(now+.24)}catch{}
}
export function playFootstep(){playNoise(.075,.012,240)}
export function playPowerCut(){playTone(75,.65,'sawtooth',.12);playNoise(.55,.07,450);setTimeout(()=>playTone(42,.45,'triangle',.08),180)}
export function playWhisper(){playNoise(.45,.035,650);playTone(165,.3,'triangle',.018)}
export function startShopAmbience(){
 try{if(ambience)return;const c=audioContext(),osc=c.createOscillator(),filter=c.createBiquadFilter(),gain=c.createGain();osc.type='triangle';osc.frequency.value=54;filter.type='lowpass';filter.frequency.value=105;gain.gain.value=.009;osc.connect(filter);filter.connect(gain);gain.connect(master);osc.start();ambience={osc,gain}}catch{}
}
export function stopShopAmbience(){if(!ambience)return;try{ambience.gain.gain.setTargetAtTime(.0001,context.currentTime,.2);ambience.osc.stop(context.currentTime+.7)}catch{}ambience=null}
export function startPhoneRing(){
 stopPhoneRing();const burst=()=>{playTone(920,.34,'sine',.09);setTimeout(()=>playTone(690,.38,'sine',.085),420);setTimeout(()=>playTone(920,.34,'sine',.09),880);setTimeout(()=>playTone(690,.38,'sine',.085),1300)};burst();phoneRingTimer=setInterval(burst,2300);
}
export function stopPhoneRing(){if(phoneRingTimer!==null){clearInterval(phoneRingTimer);phoneRingTimer=null}}

export function playPickup(){playTone(610,.055,'triangle',.025);playNoise(.045,.012,1700)}
export function playPlace(){playTone(260,.07,'triangle',.035);playNoise(.09,.018,650)}
export function playChop(){for(let i=0;i<3;i++)setTimeout(()=>{playNoise(.055,.05,1500);playTone(125,.045,'square',.035)},i*115)}
export function playWash(){playNoise(.9,.028,2100);playTone(520,.12,'sine',.012)}
export function playDoorBell(){playTone(1250,.12,'sine',.035);setTimeout(()=>playTone(980,.16,'sine',.03),130)}
export function playCustomerTalk(strange=false){
 try{const c=audioContext(),now=c.currentTime;const osc=c.createOscillator(),filter=c.createBiquadFilter(),gain=c.createGain(),lfo=c.createOscillator(),lfoGain=c.createGain();osc.type=strange?'sawtooth':'triangle';osc.frequency.value=strange?88:125+Math.random()*65;filter.type='bandpass';filter.frequency.value=strange?360:720;filter.Q.value=2.5;lfo.frequency.value=5.2;lfoGain.gain.value=5;lfo.connect(lfoGain);lfoGain.connect(osc.frequency);gain.gain.setValueAtTime(.001,now);gain.gain.linearRampToValueAtTime(.026,now+.06);gain.gain.exponentialRampToValueAtTime(.001,now+.52);osc.connect(filter);filter.connect(gain);gain.connect(master);lfo.start(now);osc.start(now);osc.stop(now+.54);lfo.stop(now+.54)}catch{}
}
