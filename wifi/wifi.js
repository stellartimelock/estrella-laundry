(function(){var v=document.getElementById('v'),st=document.getElementById('st'),box=document.getElementById('box'),stream,det=null,cv=document.createElement('canvas'),cx=cv.getContext('2d',{willReadFrequently:true});
function parse(t){if(!/^WIFI:/i.test(t))return null;var o={};t.slice(5).replace(/(\w):((?:\\.|[^;])*);/g,function(_,k,val){o[k.toUpperCase()]=val.replace(/\\(.)/g,'$1')});return o.S?o:null}
function stop(){if(stream)stream.getTracks().forEach(function(t){t.stop()});box.hidden=true}
function found(t){var w=parse(t);if(!w){st.textContent='That is not a Wi-Fi code. Try the one on the wall. / Ese no es un código de Wi-Fi.';return false}
stop();document.getElementById('ssid').textContent=w.S;document.getElementById('pw').textContent=w.P||'(none / ninguna)';document.getElementById('res').hidden=false;st.textContent='Found it! / ¡Listo!';return true}
function tick(){if(box.hidden)return;if(v.readyState>=2){if(det){det.detect(v).then(function(c){if(c.length&&found(c[0].rawValue))return;requestAnimationFrame(tick)}).catch(function(){requestAnimationFrame(tick)});return}
if(window.jsQR){cv.width=v.videoWidth;cv.height=v.videoHeight;cx.drawImage(v,0,0);var d=cx.getImageData(0,0,cv.width,cv.height),c=jsQR(d.data,d.width,d.height);if(c&&found(c.data))return}}requestAnimationFrame(tick)}
document.getElementById('start').onclick=function(){st.textContent='Point your camera at the code. / Apunte la cámara al código.';document.getElementById('res').hidden=true;
if('BarcodeDetector' in window){try{det=new BarcodeDetector({formats:['qr_code']})}catch(e){det=null}}
navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false}).then(function(s){stream=s;v.srcObject=s;box.hidden=false;v.play();tick()}).catch(function(){st.textContent='Camera blocked. Use your phone camera app instead. / Cámara bloqueada. Use la cámara del teléfono.'})};
document.getElementById('copy').onclick=function(){var b=this,t=document.getElementById('pw').textContent;navigator.clipboard&&navigator.clipboard.writeText(t).then(function(){b.textContent='Copied! / ¡Copiado!';setTimeout(function(){b.textContent='Copy / Copiar'},2000)})};})();
