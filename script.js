const redSlider = document.querySelector('#redSlider');
const redValue = document.querySelector('#redValue');
const greenSlider = document.querySelector('#greenSlider');
const greenValue = document.querySelector('#greenValue');
const blueSlider = document.querySelector('#blueSlider');
const blueValue = document.querySelector('#blueValue');
const hexValue = document.querySelector('#hexValue');
const inputs = document.querySelectorAll('.colorSelect');
const colorPreview = document.querySelector('#colorPreview');
const gridSlider = document.querySelector('#gridSlider');
const gridSize = document.querySelector('#gridSize');
const gridlines = document.querySelector('#gridlines');
const eraser = document.querySelector('#eraser');
const reset = document.querySelector('#reset');
const gridContainer = document.querySelector('#gridContainer');

let defaultColor = '#FFFFFF';
let defaultSize = 64;
let color = defaultColor;
let size = defaultSize;
colorPreview.style.backgroundColor = color;

//Check if mouse is actively clicked
let mouseDown = false;
gridContainer.addEventListener('mousedown', () => {
    mouseDown = true;
});
gridContainer.addEventListener('mouseup', () => {
    mouseDown = false;
})

function updateColor(event){
    //Update selected color when sliders or rgb/hex values are changed
    let red;
    let green;
    let blue;
    let hexColor;

    if (event.target.classList.contains('slider')){
        //get rgb values from sliders
        red = redSlider.value;
        green = greenSlider.value;
        blue = blueSlider.value;
        //update color
        color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        hexColor = rgbToHex(red, green, blue);
    }
    else if (event.target.classList.contains('rgb')){
        //get rgb values from number input
        red = redValue.value;
        green = greenValue.value;
        blue = blueValue.value;
        //update color
        color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        hexColor = rgbToHex(red, green, blue);
    }
    else { 
        //get color from hex input
        if (hexValue.value[0] == '#'){
            hexColor = hexValue.value;
        }
        else {
            hexColor = '#' + hexValue.value;
        }
        //convert hex code to rgb
        color = hexColor;
        red = hexToRGB(hexColor)[0];
        green = hexToRGB(hexColor)[1];
        blue = hexToRGB(hexColor)[2];
    }
    //Update all sliders/inputs
    redSlider.value = red;
    redValue.value = red;
    greenSlider.value = green;
    greenValue.value = green;
    blueSlider.value = blue;
    blueValue.value = blue;
    hexValue.value = hexColor;
    colorPreview.style.backgroundColor = color;
}

function toggleEraser(){
    eraser.classList.toggle('toggled');
    if (eraser.hasClass('toggled')){
        color = '#000000';
    }
    else{
        color = hexValue.value;
    }
}

//Convert between hex and rgb to update sliders/text inputs
function hexToRGB(hexColor){
    return [parseInt(String(hexColor.slice(1, 3)), 16), parseInt(hexColor.slice(3, 5), 16), parseInt(hexColor.slice(5), 16)];
}
function rgbToHex(red, green, blue){
    let redHex = Number(red).toString(16).toUpperCase();
    let greenHex = Number(green).toString(16).toUpperCase();
    let blueHex = Number(blue).toString(16).toUpperCase();
    return '#' + redHex + greenHex + blueHex;
}

//Assign functions to inputs
inputs.forEach((input) => {
    input.addEventListener('input', updateColor);
});