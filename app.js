const results = document.getElementById('results');
const logEl = document.getElementById('log');
const testButton = document.getElementById('testButton');
const startButton = document.getElementById('startButton');

function line(label, value, status = 'warn') {
  const row = document.createElement('div');
  row.className = 'row';

  const left = document.createElement('div');
  left.textContent = label;

  const right = document.createElement('div');
  right.className = `value ${status}`;
  right.textContent = value;

  row.append(left, right);
  results.appendChild(row);
}

function log(message) {
  const time = new Date().toLocaleTimeString();
  logEl.textContent += `\n[${time}] ${message}`;
}

function yn(v) {
  return v ? ['JA', 'ok'] : ['NEE', 'bad'];
}

async function diagnose() {
  results.innerHTML = '';
  logEl.textContent = 'Diagnose gestart…';

  const secure = window.isSecureContext;
  const [secureText, secureClass] = yn(secure);
  line('Secure context (HTTPS)', secureText, secureClass);

  const hasNavigatorXR = 'xr' in navigator;
  const [xrText, xrClass] = yn(hasNavigatorXR);
  line('navigator.xr aanwezig', xrText, xrClass);

  line('Protocol', location.protocol, location.protocol === 'https:' ? 'ok' : 'bad');
  line('Host', location.host || '(geen)', 'warn');

  const hasWebGL2 = (() => {
    try {
      const c = document.createElement('canvas');
      return !!c.getContext('webgl2');
    } catch {
      return false;
    }
  })();
  const [glText, glClass] = yn(hasWebGL2);
  line('WebGL2 beschikbaar', glText, glClass);

  line('Browser/User-Agent', navigator.userAgent, 'warn');

  if (!hasNavigatorXR) {
    line('immersive-ar ondersteund', 'NIET TE TESTEN', 'bad');
    log('navigator.xr bestaat niet. De browser biedt de WebXR Device API niet aan.');
    startButton.disabled = true;
    return;
  }

  try {
    log('navigator.xr.isSessionSupported("immersive-ar") wordt getest…');
    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    const [sText, sClass] = yn(supported);
    line('immersive-ar ondersteund', sText, sClass);

    if (supported) {
      log('immersive-ar wordt door de browser als ondersteund gemeld.');
      startButton.disabled = false;
    } else {
      log('De browser meldt: immersive-ar NIET ondersteund.');
      startButton.disabled = true;
    }
  } catch (err) {
    line('immersive-ar test', 'FOUT', 'bad');
    log(`Fout bij isSessionSupported: ${err.name}: ${err.message}`);
    startButton.disabled = true;
  }
}

testButton.addEventListener('click', diagnose);

startButton.addEventListener('click', async () => {
  if (!navigator.xr) {
    log('START AR afgebroken: navigator.xr ontbreekt.');
    return;
  }

  log('AR-sessie wordt rechtstreeks aangevraagd…');

  try {
    const session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['local-floor']
    });

    log('SUCCES: immersive-ar sessie gestart.');
    alert('AR-sessie gestart. Deze diagnoseversie toont nog geen kubus.');

    session.addEventListener('end', () => {
      log('AR-sessie beëindigd.');
    });

  } catch (err) {
    log(`START AR FOUT: ${err.name}: ${err.message}`);
    alert(`AR kon niet starten:\n${err.name}: ${err.message}`);
  }
});

diagnose();
