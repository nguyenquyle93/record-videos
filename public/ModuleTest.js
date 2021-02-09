function module(b) {
  var a = 5;
  a = b * a
  console.log(a)
}
module(10)
console.log(" da ket noi thanh cong");
document.body.onload = addElement;

function addElement () {
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode('Connected!');
  newDiv.appendChild(newContent);
  var currentDiv = document.getElementById('div1');
  document.body.insertBefore(newDiv, currentDiv);
}

