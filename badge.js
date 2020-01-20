// The background image (which we pre-render)
require("FontDennis8").add(Graphics);

var background;
// rotation
var rx = 0, ry = 0;

// pre-render the background image
function createBackground() {
  g.clear();
  g.setFontDennis8();
  g.drawString("David Balan         \x91\x92\x93\x94\x95\x96\x97",0,5);
  background = new Uint8Array(g.buffer.length);
  background.set(new Uint8Array(g.buffer));
}

// Draw the cube at rotation rx and ry
function draw() {
  // precalculate sin&cos for rotations
  var rcx=Math.cos(rx), rsx=Math.sin(rx);
  var rcy=Math.cos(ry), rsy=Math.sin(ry);
  // Project 3D into 2D
  function p(x,y,z) {
    var t;
    t = x*rcy + z*rsy;
    z = z*rcy - x*rsy;
    x=t;
    t = y*rcx + z*rsx;
    z = z*rcx - y*rsx;
    y=t;
    z += 4;
    return [60 + 46*x/z, 42 + 42*y/z];
  }

  var a,b;
  // -z
  a = p(-1,-1,-1);
  b = p(1,-1,-1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  a = p(1,1,-1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  b = p(-1,1,-1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  a = p(-1,-1,-1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  // z
  a = p(-1,-1,1);
  b = p(1,-1,1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  a = p(1,1,1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  b = p(-1,1,1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  a = p(-1,-1,1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  // edges
  a = p(-1,-1,-1);
  b = p(-1,-1,1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  a = p(1,-1,-1);
  b = p(1,-1,1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  a = p(1,1,-1);
  b = p(1,1,1);
  g.drawLine(a[0],a[1],b[0],b[1]);
  a = p(-1,1,-1);
  b = p(-1,1,1);
  g.drawLine(a[0],a[1],b[0],b[1]);
}

function step() {
  // reset the contents of the graphics to
  // our pre-rendered name
  new Uint8Array(g.buffer).set(background);
  // change rotation
  rx += 0.1;
  ry += 0.1;
  draw();
  // update the whole display
  g.flip(true);
}

// pre-render the background image
createBackground();
// Start animation at 5fps (for reasonable battery life!)
setInterval(step,250);
