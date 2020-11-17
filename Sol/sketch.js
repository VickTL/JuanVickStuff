var colorLinea = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {

  // Desde el centro, crea una onda con un ángulo aleatorio
  translate(width/2,height/2);
  rotate(radians(random(361)));
  onda(0,0);

  // El tono del color va cambiando a lo largo del tiempo
  colorLinea = colorLinea + 0.05;
  if(colorLinea>360) {colorLinea = 0;}
}

function onda(OX,OY) {

  // ¿De donde sale la onda?
  var origenX = OX;
  var origenY = OY;

  // Parámetros de la onda
  var frecuencia = 10;
  var amplitud = 4;
  var ciclos = random(1,10);

  // Parámetros de la linea
  push();
  noFill();
  strokeWeight(3);
  colorMode(HSB, 360, 100, 100);

  // El tono varía con el tiempo, la saturación y luminosidad son aleatorios dentro de un rango.
  stroke(random(colorLinea+10, colorLinea-10),random(90, 95), random(70, 97));

  // Creación modular de la onda
  beginShape();
    // Primer vertice centrado
   // curveVertex(origenX, origenY);
    //curveVertex(origenX, origenY);

    // Siguientes vertices
    for(var i = 1; i<(2*ciclos)+2; i = i+2) {
      curveVertex(origenX+frecuencia*i, origenY-amplitud);
      //vertex(origenX+frecuencia*i, origenY);
      curveVertex(origenX+frecuencia*(i+1), origenY+amplitud);
    }
  endShape();
  pop();
}
