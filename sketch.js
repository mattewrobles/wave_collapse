const celdas = [];
let RETICULAX = document.getElementById('cellSize').value; //mayuscula es estático no varia
let RETICULAY;
let ancho; //ancho de celda
let alto; //altura de celda
const startButton = document.getElementById("start");
const azulejos = [];

const NA = reglas.length; //Numero de azulejos

function preload() {
  //carga las imagenes
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage(`tiles/Tile${i}.png`);
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight); // debe ser cuadrado para tener proporción de las imágenes
  canvas.id("myCanvas"); // Añadir id al canvas

  ancho = width / RETICULAX; //divide el ancho y el alto para que se adapte con las baldosas
  alto = ancho;
  RETICULAY = Math.floor(height / ancho);

  let optInit = [];
  for (let i = 0; i < azulejos.length; i++) {
    optInit.push(i);
  }

  for (let i = 0; i < RETICULAX * RETICULAY; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: optInit,
    }
  }
  startButton.addEventListener("click", resetAll);
}

function draw() {
  const celdasConOpt = celdas.filter((celda) => {
    return celda.opciones.length > 0;
  });

  const celdasAct = celdasConOpt.filter((celda) => {
    return celda.colapsada == false;
  });
  if (celdasAct.length > 0) {
    celdasAct.sort((a, b) => {
      return a.opciones.length - b.opciones.length;
    });
    const celdaPorColapsar = celdasAct.filter((celda) => {
      return celda.opciones.length == celdasAct[0].opciones.length;
    });

    const celdaSelect = random(celdaPorColapsar);
    celdaSelect.colapsada = true;
    const opcionSelect = random(celdaSelect.opciones);
    celdaSelect.opciones = [opcionSelect];

    //    print(celdaSelect);

    for (let x = 0; x < RETICULAX; x++) {
      for (let y = 0; y < RETICULAY; y++) {
        const celdaIndex = x + y * RETICULAX;
        const celdaAct = celdas[celdaIndex];
        if (celdaAct.opciones.length < 1) {
          fill(150, 0, 50, 20);
          rect(x * ancho, y * alto, ancho, alto);
        }

        if (celdaAct.colapsada) {
          const tileIndex = celdaAct.opciones[0];
          const reglasAct = reglas[tileIndex];
          print(reglasAct);
          image(azulejos[tileIndex], x * ancho, y * alto, ancho, alto);

          //           monitoriar UP
          if (y > 0) {
            const indexUP = x + (y - 1) * RETICULAX;
            const celdaUP = celdas[indexUP];
            if (!celdaUP.colapsada) {
              cambiarEntropia(celdaUP, reglasAct["UP"], "DOWN");
            }
          }
          //          Mon. Right
          if (x < RETICULAX - 1) {
            const indexRIGHT = x + 1 + y * RETICULAX;
            const celdaRIGHT = celdas[indexRIGHT];
            if (!celdaRIGHT.colapsada) {
              cambiarEntropia(celdaRIGHT, reglasAct["RIGHT"], "LEFT");
            }
          }
          //           Mon. Down
          if (y < RETICULAY - 1) {
            const indexDOWN = x + (y + 1) * RETICULAX;
            const celdaDOWN = celdas[indexDOWN];
            if (!celdaDOWN.colapsada) {
              cambiarEntropia(celdaDOWN, reglasAct["DOWN"], "UP");
            }
          }
          //           Mont. left
          if (x > 0) {
            const indexLEFT = x - 1 + y * RETICULAX;
            const celdaLEFT = celdas[indexLEFT];
            if (!celdaLEFT.colapsada) {
              cambiarEntropia(celdaLEFT, reglasAct["LEFT"], "RIGHT");
            }
          }
        } else {
          strokeWeight(5); //dibuja reticula base
          rect(x * ancho, y * alto, ancho, alto);
        }
      }
    }
    //    noLoop();
    } else {
      
    }
  }

  function cambiarEntropia(_celda, _regla, _opuesta) {
    const nuevasOpciones = [];
    for (let i = 0; i < _celda.opciones.length; i++) {
      if (_regla == reglas[_celda.opciones[i]][_opuesta]) {
        const celdaCompatible = _celda.opciones[i];
        nuevasOpciones.push(celdaCompatible);
      }
    }
    _celda.opciones = nuevasOpciones;
  }

function resetAll() {
  RETICULAX = document.getElementById('cellSize').value;
  ancho = width / RETICULAX; //divide el ancho y el alto para que se adapte con las baldosas
  alto = ancho;
  RETICULAY = Math.floor(height / ancho);
  let optInit = [];
  for (let i = 0; i < azulejos.length; i++) {
    optInit.push(i);
  }
  for (let i = 0; i < RETICULAX * RETICULAY; i ++) {
    celdas[i] = {
      colapsada: false,
      opciones: optInit,
    };
  };
    }

