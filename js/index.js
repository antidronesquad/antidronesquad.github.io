// Polyfills
NodeList.prototype.forEach = NodeList.prototype.forEach || function(fn) {
  return Array.prototype.forEach.call(this, fn);
}

function $(selector) {
  return document.querySelectorAll(selector);
}

// VARS
var numParticles = 60000;
var valueScale = 0.5;
var animationRates = [
  0, -10.0001, -10.0001,
  10.0001,
  10.0001,
  10.0001, -10.0001
];

// Setup Stage
var pixelRatio = window.devicePixelRatio;
var WIDTH = window.innerWidth * pixelRatio;
var HEIGHT = window.innerHeight * pixelRatio;
var HALF_WIDTH = WIDTH >> 1;
var HALF_HEIGHT = HEIGHT >> 1;

var stageCanvas = $("canvas.stage")[0];
var ctx = stageCanvas.getContext("2d");
var stageImgData = ctx.createImageData(WIDTH, HEIGHT);
ctx.globalCompositeOperation = "screen";


// Setup Menu
var sliders = $('input[type=range]');
sliders.forEach(function(s) {
  s.addEventListener('input', onSliderInput);
})

function onSliderInput(e) {
  updateText(e.target);
  drawAll(numParticles, getVals());
}

var textFields = $('input[type=text]');

textFields.forEach(function(f) {
  f.addEventListener('change', onChangeText);
})

function onChangeText(e) {
  updateSlider(e.target);
  drawAll(numParticles, getVals());
}

$('button.randomize')[0].addEventListener('click', function() {
  randomize();
  drawAll(numParticles, getVals());
});
$('button.save')[0].addEventListener('click', save);
$('button.play')[0].addEventListener('click', play);
$('button.stop')[0].addEventListener('click', stop);

// Menu IO
function save(e) {
  var a = document.createElement('a');
  a.download = "CompositeWaveFractal-" + Date.now();
  a.href = stageCanvas.toDataURL('image/png');

  var e2 = document.createEvent("HTMLEvents");
  e2.initEvent('click', true, true);
  return !a.dispatchEvent(e2);
}

function randomize() {
  sliders.forEach(function(s,i) {
    // i=0 is the scale slider
    s.value = i ? ((Math.random() * 4) - 2) * 1000 : ((Math.random() * 2) - 1);
    updateText(s);
  });
}

var vals = [];

function getVals() {
  vals = Array.prototype.map.call(sliders, function(s) {
    return s.value / 30;
  })

  valueScale = vals.shift();
  vals = vals.map(function(v) {
    return v * valueScale;
  })
  return vals;
}

function updateText(slider) {
  slider.parentNode.querySelector('.readout').value = slider.value;

}

function updateSlider(textField) {
  textField.parentNode.querySelector('input[type=range]').value = parseFloat(textField.value);

}

// DRAW!!
var newImageData;

function drawAll(n, vals) {
  newImageData = ctx.createImageData(WIDTH, HEIGHT);
  var xs = 0,
    ys = 0,
    zs = 0;

  for (var i = n; i >= 0; i--) {
    var res = drawPoint(xs, ys, zs, vals)
    xs = res[0];
    ys = res[1];
    zs = res[2];
  }
  ctx.putImageData(newImageData, 0, 0);
}

function drawPoint(xs, ys, zs, vals) {
  var new_x = Math.sin(vals[0] * xs) + Math.sin(vals[1] * ys) - Math.cos(vals[2] * zs);
  var new_y = Math.sin(vals[3] * xs) + Math.sin(vals[4] * ys) - Math.cos(vals[5] * zs);
  xs = new_x;
  ys = new_y;
  zs = zs + 0.1;

  addPixel(
    newImageData,
    ((xs * WIDTH) >> 3) + HALF_WIDTH,
    ((ys * HEIGHT) >> 3) + HALF_HEIGHT,
    146, 171, 211, 0.4
  );

  return [xs, ys, zs]
}

document.addEventListener("DOMContentLoaded", ready);
window.addEventListener('resize', onResize);

function ready() {
  randomize();
  onResize();
}

function onResize() {
  pixelRatio = window.devicePixelRatio;
  WIDTH = window.innerWidth * pixelRatio;
  HEIGHT = window.innerHeight * pixelRatio;
  HALF_WIDTH = WIDTH >> 1;
  HALF_HEIGHT = HEIGHT >> 1;

  stageCanvas.width = WIDTH;
  stageCanvas.height = HEIGHT;
  stageImgData = ctx.createImageData(WIDTH, HEIGHT);

  drawAll(numParticles, getVals());
}

function addPixel(imageData, x, y, r, g, b, a) {
  var d = imageData.data;
  var i = (x << 2) + (y * imageData.width << 2);
  d[i] += r * a;
  d[i + 1] += g * a;
  d[i + 2] += b * a;
  d[i + 3] += 255 * a;
}

var rAF;

function play() {
  if (rAF) return;
  loop();
}

function stop() {
  cancelAnimationFrame(rAF);
  rAF = null;
}

function loop() {
  rAF = requestAnimationFrame(loop);
  sliders.forEach(function(s, i) {
    s.value = parseFloat(s.value) + animationRates[i];
    if (s.value >= parseFloat(s.max) || s.value <= parseFloat(s.min)) {
      animationRates[i] *= -1
    }
    updateText(s);
  })

  drawAll(numParticles, getVals());
}
