let context;
let master;
function audioContext() {
  if (!context) {
    context = new (window.AudioContext || window.webkitAudioContext)();
    master = context.createGain(); master.gain.value = .72; master.connect(context.destination);
  }
  if (context.state === "suspended") context.resume();
  return context;
}
export function playTone(frequency=440, duration=.14, type="sine", volume=.045) {
  try {
    const c=audioContext(), osc=c.createOscillator(), gain=c.createGain();
    osc.type=type; osc.frequency.setValueAtTime(frequency,c.currentTime);
    gain.gain.setValueAtTime(volume,c.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001,c.currentTime+duration);
    osc.connect(gain); gain.connect(master); osc.start(); osc.stop(c.currentTime+duration);
  } catch {}
}
export function playNoise(duration=.35, volume=.025, filter=900) {
  try {
    const c=audioContext(), length=Math.floor(c.sampleRate*duration);
    const buffer=c.createBuffer(1,length,c.sampleRate), data=buffer.getChannelData(0);
    for(let i=0;i<length;i++) data[i]=(Math.random()*2-1)*(1-i/length);
    const source=c.createBufferSource(), low=c.createBiquadFilter(), gain=c.createGain();
    source.buffer=buffer; low.type="lowpass"; low.frequency.value=filter;
    gain.gain.value=volume; source.connect(low); low.connect(gain); gain.connect(master);
    source.start();
  } catch {}
}
export function playBell() { playTone(880,.16,"sine"); setTimeout(()=>playTone(1175,.2,"sine"),150); }
export function playDoor() { playTone(180,.12,"triangle",.06); playNoise(.12,.018,500); }
export function playFryer() { playNoise(.8,.045,1800); }
export function playScare() { playTone(48,.85,"sawtooth",.18); setTimeout(()=>playTone(920,.28,"square",.1),110); }
export function startShopAmbience() {
  try {
    const c=audioContext(), osc=c.createOscillator(), gain=c.createGain(), filter=c.createBiquadFilter();
    osc.type="triangle"; osc.frequency.value=58; filter.type="lowpass"; filter.frequency.value=110;
    gain.gain.value=.008; osc.connect(filter); filter.connect(gain); gain.connect(master); osc.start();
  } catch {}
}

export function playCustomerVoice(strange=false) {
  try {
    const c=audioContext(), now=c.currentTime;
    const base=strange?92:145+Math.random()*45;
    const osc=c.createOscillator(), formant=c.createBiquadFilter(), gain=c.createGain();
    osc.type=strange?"sawtooth":"triangle";
    osc.frequency.setValueAtTime(base,now);
    osc.frequency.exponentialRampToValueAtTime(base*(strange?1.8:1.35),now+.16);
    formant.type="bandpass"; formant.frequency.value=strange?420:760; formant.Q.value=2.2;
    gain.gain.setValueAtTime(.001,now);gain.gain.linearRampToValueAtTime(strange?.035:.018,now+.035);gain.gain.exponentialRampToValueAtTime(.001,now+.23);
    osc.connect(formant);formant.connect(gain);gain.connect(master);osc.start(now);osc.stop(now+.24);
  } catch {}
}
export function playFootstep() { playNoise(.075,.012,240); }

let phoneRingTimer = null;
export function startPhoneRing() {
  stopPhoneRing();
  const burst = () => {
    playTone(920,.34,"sine",.09);
    setTimeout(()=>playTone(690,.38,"sine",.085),420);
    setTimeout(()=>playTone(920,.34,"sine",.09),880);
    setTimeout(()=>playTone(690,.38,"sine",.085),1300);
  };
  burst();
  phoneRingTimer=setInterval(burst,2300);
}
export function stopPhoneRing() {
  if(phoneRingTimer!==null){clearInterval(phoneRingTimer);phoneRingTimer=null;}
}
