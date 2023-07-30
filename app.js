//*****************************


var n=20;
var temp;
var tempColor='#42445A';
var COULEUR='#42445A';
var backgroundColor='rgb(255,255,255)';

var shading=false;
var erasing=false;
var coloringBool=true;
var lighting = false;

var mouseIsDown = false;
var cells;

//selecting elements
const sketchPad = document.querySelector('.sketchPad');
const eraser = document.querySelector('.eraser');
const shadeBtn = document.querySelector('.shading');
const lightBtn = document.querySelector('.lighting');
const upBtn = document.querySelector('.up');
const downBtn = document.querySelector('.down');
const colorBtn = document.querySelector('.color');
const numberOfCells = document.querySelector('.cellNumber');
const checkBox = document.querySelector('.check');
numberOfCells.textContent=n;

createSketchPad(n);


const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'


    components: {

        // Main components
        preview: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            save: true
        }
    }
});

addCellsEventListeners();

function keepColoredWhileClicked(element, bool){
if (bool) {
  element.style.background='#43a595';
  element.style.color='white';
}
else{
  element.style.background='none';
  element.style.color='';
}
}

pickr.on('save', (color) => {
COULEUR=color.toRGBA().toString();
tempColor=COULEUR;
coloringBool=true;
shading=false;
lighting=false;
erasing=false;
keepColoredWhileClicked(shadeBtn, shading);
keepColoredWhileClicked(lightBtn, lighting);
keepColoredWhileClicked(colorBtn, coloringBool);
keepColoredWhileClicked(eraser, erasing);
});

upBtn.addEventListener('click', function(){
  if (n<90){
    COULEUR=tempColor;
    shading=false;
    lighting=false;
coloringBool=true;
  emptysketchPad();
  n=n+10;
  numberOfCells.textContent=n;
  createSketchPad(n);
  addCellsEventListeners();
  }
});

downBtn.addEventListener('click', function(){
  if (n>10){
    COULEUR=tempColor;
    shading=false;
    lighting=false;
coloringBool=true;
  emptysketchPad();
  n=n-10;
  numberOfCells.textContent=n;
  createSketchPad(n);
  addCellsEventListeners();
  }
  });

function emptysketchPad(){
  const columns = document.querySelectorAll('.column');
 columns.forEach(function(column){
  sketchPad.removeChild(column);
 })
  }


function createSketchPad(number){
for(var i = 0; i <number; i++) {
   var column=document.createElement("div");
    column.classList.add("column");
    sketchPad.appendChild(column);
    for(var j = 0; j <number; j++) {
    var cell=document.createElement("button");
    cell.classList.add("cell"); 
    cell.style.background = 'rgb(255,255,255)';
    column.appendChild(cell);
      if (checkBox.checked) {
        cell.style.border = '0.1px solid black';
      } else {
        cell.style.border ='0px solid transparent';
      }
  
    }
}
}



function newShade (rgb, value){
  var r, g, b;

  //extract the r, g, and b values
  var rgb = rgb.slice(4,rgb.length-1).split(',');
  //maybe add a limit t3 255
r=parseFloat(rgb[0])+value;
g=parseFloat(rgb[1])+value;
b=parseFloat(rgb[2])+value;

rgb= 'rgb('+r+','+g+','+b+')';

return rgb.toString();
}


function coloring (element){

  if (shading){
    temp= element.style.background;
    element.style.background=newShade(temp,-10);
  }
  else if (lighting){
    temp= element.style.background;
    element.style.background=newShade(temp,10);
  } else if (coloringBool){
    element.style.background=COULEUR;
  }
   else if (erasing){
    element.style.background=COULEUR;
   }
}



eraser.addEventListener('click', function(){
  COULEUR=backgroundColor;
  erasing=true;
  shading=false;
  lighting=false;
  coloringBool=false;
  keepColoredWhileClicked(shadeBtn, shading);
keepColoredWhileClicked(lightBtn, lighting);
keepColoredWhileClicked(colorBtn, coloringBool);
keepColoredWhileClicked(eraser, erasing);
});


shadeBtn.addEventListener('click', function () {
shading=true;
lighting=false;
coloringBool=false;
erasing=false;
keepColoredWhileClicked(shadeBtn, shading);
keepColoredWhileClicked(lightBtn, lighting);
keepColoredWhileClicked(colorBtn, coloringBool);
keepColoredWhileClicked(eraser, erasing);
});


lightBtn.addEventListener('click', function () {
lighting=true;
shading=false;
coloringBool=false;
erasing=false;
keepColoredWhileClicked(shadeBtn, shading);
keepColoredWhileClicked(lightBtn, lighting);
keepColoredWhileClicked(colorBtn, coloringBool);
keepColoredWhileClicked(eraser, erasing);
});


colorBtn.addEventListener('click', function () {
COULEUR=tempColor;
coloringBool=true;
shading=false;
lighting=false;
erasing=false;
keepColoredWhileClicked(shadeBtn, shading);
keepColoredWhileClicked(lightBtn, lighting);
keepColoredWhileClicked(colorBtn, coloringBool);
keepColoredWhileClicked(eraser, erasing);
});

//this is basically the thing that colors it
function addCellsEventListeners() {
cells=document.querySelectorAll('.cell');
cells.forEach((cell) => {

  cell.addEventListener('mousedown', function () {
    mouseIsDown = true; // Set the flag when the mouse button is pressed down
  });

  cell.addEventListener('mouseup', function () {
    mouseIsDown = false; // Reset the flag when the mouse button is released
  });


  cell.addEventListener('click', function () {
   coloring(cell);
  });


  cell.addEventListener('mouseover', function () {
    if (mouseIsDown) {
    coloring(cell);
    }
  });


  cell.addEventListener('mouseout', function () {
    if (mouseIsDown) {
    coloring(cell); 
    }
  });

  checkBox.addEventListener('change', function() {
    if (this.checked) {
      cell.style.border = '0.1px solid black';
    } else {
      cell.style.border ='0px solid transparent';
    }
  });
});
}
