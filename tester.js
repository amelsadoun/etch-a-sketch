function newShade (rgb, value){
    var r, g, b;

    //extract the r, g, and b values
    var rgb = rgb.slice(4,rgb.length-1).split(',');
r=parseFloat(rgb[0])+value;
g=parseFloat(rgb[1])+value;
b=parseFloat(rgb[2])+value;

rgb= 'rgb('+r+','+g+','+b+')';

return rgb.toString();
}

console.log(newShade('rgb(10,10,10)', 20));


