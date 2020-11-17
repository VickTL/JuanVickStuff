var alturaSuelo;
var anchoBola;
var altoBola;
var tamanoOrig;
var fuerza;
var salto;
var ox; // Origen
var oy;
var maxF;
var drag;
var terminado;


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Inicialización de variables
  alturaSuelo = height*0.2;
  tamanoOrig = width/6;
  anchoBola = tamanoOrig;
  altoBola = tamanoOrig;
  ox = width/2;
  oy = height-alturaSuelo-altoBola/2;
  fuerza = 0;
  maxF = 0;
  drag = 0;
  terminado = true;
}



function draw() {  
  var col = color(3*fuerza+270, 10,100);
  background(col);
  colorMode(HSB, 360, 100, 100);
  
  // Crear suelo
  fill(0);
  noStroke();
  rect(0,height-alturaSuelo,  width,height);
   
  push();
  // Crear pelotita 
  col = color(3*fuerza+270, 50,90);
  translate(ox,oy);
  fill(col);
  stroke(0);
  strokeWeight(tamanoOrig*0.05);
  ellipse(0,0, anchoBola, altoBola);
  
  // Brillito
  fill('rgba(255,255,255,0.3)');
  noStroke();
  ellipse(-anchoBola/2+anchoBola*0.3, -altoBola/2+altoBola*0.25, anchoBola*0.3, altoBola*0.3);
  
  // Ojos
  fill(0);
  if(tamanoOrig-altoBola>tamanoOrig*0.3) { // Expresión cuando apretado
    ellipse(-anchoBola*0.15, 0, anchoBola*0.15, altoBola*0.057);
    ellipse(anchoBola*0.15, 0, anchoBola*0.15, altoBola*0.057);
    
    push();
    translate(-anchoBola*0.15,-anchoBola*0.025);
    rotate(radians(20));
    ellipse(0, 0, anchoBola*0.15, altoBola*0.057);
    pop();
    push();
    translate(anchoBola*0.15,-anchoBola*0.025);
    rotate(radians(-20));
    ellipse(0, 0, anchoBola*0.15, altoBola*0.057);
    pop();
    
    // Mofletes
    fill(0, 100,100, 0.15);
    ellipse(-anchoBola*0.25, altoBola*0.2, anchoBola*0.4, altoBola*0.6);
    ellipse(anchoBola*0.25, altoBola*0.2, anchoBola*0.4, altoBola*0.6);
    
  } else { // Expresión normal
    ellipse(-anchoBola*0.15, 0, anchoBola*0.1, altoBola*0.21);
    ellipse(anchoBola*0.15, 0, anchoBola*0.1, altoBola*0.21);
    col = color(3*fuerza+270, 15,100);
    fill(col);
    ellipse(-anchoBola*0.16, -altoBola*0.06, anchoBola*0.04, altoBola*0.06);
    ellipse(anchoBola*0.14, -altoBola*0.06, anchoBola*0.04, altoBola*0.06);
  }
  
  //println("fuerza:"+fuerza);
  
  
  
  
  // Funcionalidad drag hacia abajo y constrains
  if(terminado==true&&mouseIsPressed) {
    
    if(drag==0) { drag = mouseY; }
    else if(drag!=mouseY&&mouseIsPressed) { 
      var distancia = mouseY-drag;
      
      //println(distancia);
      //println("drag: " + drag);
      
      altoBola = map(distancia, 0,height, tamanoOrig, tamanoOrig/2);
      altoBola = constrain(altoBola, tamanoOrig/2, tamanoOrig);
    } 
    
    
   // altoBola = map(height-mouseY, 0,height, tamanoOrig/2, tamanoOrig);
   // altoBola = constrain(altoBola, tamanoOrig/2, tamanoOrig);
    
    fuerza = tamanoOrig-altoBola; // cuanto más se presione, más fuerza acumula (max: tamanoOrig/2)
    maxF = fuerza; // Guarda el valor de la fuerza acumulada para luego el rebote
    fuerza = constrain(fuerza, -1000, tamanoOrig-altoBola-0.1); // Al llegar al maximo se buguea y no vuelve
    anchoBola = tamanoOrig+(0.5*fuerza);
    oy = height-alturaSuelo-altoBola/2;
  
  // Funcionalidad salto
  } else if(fuerza!=0) { // Si hay fuerza acumulada, cuando se suelta el ratón salta
    
    terminado = false;
    
    altoBola = tamanoOrig+(0.5*abs(fuerza));
    anchoBola = tamanoOrig-(0.5*abs(fuerza));
    
    oy = oy-fuerza;
    
    if(oy+altoBola/2>=height-alturaSuelo) { // Cuando toca el suelo
      
      fuerza = maxF/2; // Rebote
      maxF = maxF/2; // Pérdida de fuerza
       
      if(fuerza<0.008) { fuerza = 0; terminado = true; }
      
      anchoBola = tamanoOrig; // Reset tamaño
      altoBola = tamanoOrig;
      
      //oy = height-alturaSuelo-altoBola/2; // Reset origen
    } else  {
      fuerza--; // Si no toca el suelo, la fuerza disminuye con la "Gravedad"
    }
    
  } else { // Bolita reacciona a los cambios en el tamaño, y si está en el suelo, se mantiene sobre él, y no lo atraviesa.
    drag = 0;
    
    altoBola = tamanoOrig; 
    anchoBola = tamanoOrig;
    if(fuerza==0) { oy = height-alturaSuelo-altoBola/2; }
  }
  pop();
  
  // Cambiar tamaño con teclas
  if(keyIsPressed&&key=='+') { tamanoOrig++; }
  else if(keyIsPressed&&key=='-')  { if(tamanoOrig>1) { tamanoOrig--; }}  
 
  fill(0,0,80);
  textAlign(CENTER);
  textSize(width*0.021);
  text("Haz click y arrastra hacia abajo para aplastar la bola y hacerla saltar.", width/2, height-alturaSuelo/2-width*0.019);
  text("Puedes cambiar el tamaño de la bola con las teclas +/-.", width/2, height-alturaSuelo/2+width*0.025);
}