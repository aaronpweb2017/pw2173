var simbolo="";
var countNoCuadros=0;
var ganador="0";
function setSymbol(simbol){
	simbolo=simbol;
}
//line 1:
function getSymbol11(){
	if(simbolo=="")
		alert("Elige una opción (X ó O).");
	else{
		if(document.gato.c11.value!="")
			alert("Ya no se puede cambiar.");
		else{
			document.gato.c11.value=simbolo;
			countNoCuadros++;
			simbolo="";
		}
	}
}
function getSymbol12(){
	if(simbolo==""){
		alert("Elige una opción (X ó O).");
	}
	else{
		if(document.gato.c12.value!="" && ganador=="")
			alert("Ya no se puede cambiar.");
		else{
			document.gato.c12.value=simbolo;
			countNoCuadros++;
			simbolo="";
		}
	}
}
function getSymbol13(){
	if(simbolo==""){
		alert("Elige una opción (X ó O).");
	}
	else{
		if(document.gato.c13.value!="" && ganador=="0")
			alert("Ya no se puede cambiar.");
		else{
			document.gato.c13.value=simbolo;
			countNoCuadros++;
			simbolo="";
		}
	}
}
//line 2:
function getSymbol21(){
	if(simbolo==""){
		alert("Elige una opción (X ó O).");
	}
	else{
		if(document.gato.c21.value!="")
			alert("Ya no se puede cambiar.");
		else{
			document.gato.c21.value=simbolo;
			countNoCuadros++;
			simbolo="";
		}
	}
}
function getSymbol22(){
	if(simbolo==""){
		alert("Elige una opción (X ó O).");
	}
	else{
		if(document.gato.c22.value!="")
			alert("Ya no se puede cambiar.");
		else{
			document.gato.c22.value=simbolo;
			countNoCuadros++;
			simbolo="";
		}
	}
}
function getSymbol23(){
	if(simbolo==""){
		alert("Elige una opción (X ó O).");
	}
	else{
		if(document.gato.c23.value!="")
			alert("Ya no se puede cambiar.");
		else{
			document.gato.c23.value=simbolo;
			countNoCuadros++;
			simbolo="";
		}
	}
}
//line 3:
function getSymbol31(){
	if(simbolo==""){
		alert("Elige una opción (X ó O).");
	}
	else{
		if(document.gato.c31.value!="")
			alert("Ya no se puede cambiar.");
		else{
			document.gato.c31.value=simbolo;
			countNoCuadros++;
			simbolo="";
		}
	}
}
function getSymbol32(){
	if(simbolo==""){
		alert("Elige una opción (X ó O).");
	}
	else{
		if(document.gato.c32.value!="")
			alert("Ya no se puede cambiar.");
		else{
			document.gato.c32.value=simbolo;
			countNoCuadros++;
			simbolo="";
		}
	}
}
function getSymbol33(){
	if(simbolo==""){
		alert("Elige una opción (X ó O).");
	}
	else{
		if(document.gato.c33.value!="")
			alert("Ya no se puede cambiar.");
		else{
			document.gato.c33.value=simbolo;
			countNoCuadros++;
			simbolo="";
		}
	}
}

function termina(){
	detrminaGanador();
	if(ganador=="X"){
		alert("ganó: X."); desabilitaCuadros(); muestraGanador();
	}
	else if(ganador=="O"){
		alert("ganó: O."); desabilitaCuadros(); muestraGanador();
	}
	else{
		if(countNoCuadros==9){
			alert("nadie ganó");
			document.getElementById("winner").innerHTML = "Ganador: NO";
		}
	}
}
function desabilitaCuadros(){
	if(document.gato.c11.value!="")
		document.gato.c11.disabled = false;
	else
		document.gato.c11.disabled = true;
	if(document.gato.c12.value!="")
		document.gato.c12.disabled = false;
	else
		document.gato.c12.disabled = true;
	if(document.gato.c13.value!="")
		document.gato.c13.disabled = false;
	else
		document.gato.c13.disabled = true;
	if(document.gato.c21.value!="")
		document.gato.c21.disabled = false;
	else
		document.gato.c21.disabled = true;
	if(document.gato.c22.value!="")
		document.gato.c22.disabled = false;
	else
		document.gato.c22.disabled = true;
	if(document.gato.c23.value!="")
		document.gato.c23.disabled = false;
	else
		document.gato.c23.disabled = true;
	if(document.gato.c31.value!="")
		document.gato.c31.disabled = false;
	else
		document.gato.c31.disabled = true;
	if(document.gato.c32.value!="")
		document.gato.c32.disabled = false;
	else
		document.gato.c32.disabled = true;
	if(document.gato.c33.value!="")
		document.gato.c33.disabled = false;
	else
		document.gato.c33.disabled = true;
}
function muestraGanador(){
	document.getElementById("winner").innerHTML = "Ganador: "+ganador+"!.";
}
function startGame(){
	document.gato.c11.disabled = false; document.gato.c11.value="";
	document.gato.c12.disabled = false; document.gato.c12.value="";
	document.gato.c13.disabled = false; document.gato.c13.value="";
	document.gato.c21.disabled = false; document.gato.c21.value="";
	document.gato.c22.disabled = false; document.gato.c22.value="";
	document.gato.c23.disabled = false; document.gato.c23.value="";
	document.gato.c31.disabled = false; document.gato.c31.value="";
	document.gato.c32.disabled = false; document.gato.c32.value="";
	document.gato.c33.disabled = false; document.gato.c33.value="";
	document.getElementById("winner").innerHTML = "Ganador: ";
}
function detrminaGanador(){
	if((document.gato.c11.value=="X" && document.gato.c21.value=="X" && document.gato.c31.value=="X")
		|| (document.gato.c11.value=="X" && document.gato.c21.value=="X" && document.gato.c31.value=="X")
		|| (document.gato.c12.value=="X" && document.gato.c22.value=="X" && document.gato.c32.value=="X")
		|| (document.gato.c13.value=="X" && document.gato.c23.value=="X" && document.gato.c33.value=="X")
		|| (document.gato.c11.value=="X" && document.gato.c12.value=="X" && document.gato.c13.value=="X")
		|| (document.gato.c21.value=="X" && document.gato.c22.value=="X" && document.gato.c23.value=="X")
		|| (document.gato.c31.value=="X" && document.gato.c32.value=="X" && document.gato.c33.value=="X")
		|| (document.gato.c11.value=="X" && document.gato.c22.value=="X" && document.gato.c33.value=="X")
		|| (document.gato.c13.value=="X" && document.gato.c22.value=="X" && document.gato.c31.value=="X")){
		ganador="X";
	}
	else if((document.gato.c11.value=="O" && document.gato.c21.value=="O" && document.gato.c31.value=="O")
		|| (document.gato.c11.value=="O" && document.gato.c21.value=="O" && document.gato.c31.value=="O")
		|| (document.gato.c12.value=="O" && document.gato.c22.value=="O" && document.gato.c32.value=="O")
		|| (document.gato.c13.value=="O" && document.gato.c23.value=="O" && document.gato.c33.value=="O")
		|| (document.gato.c11.value=="O" && document.gato.c12.value=="O" && document.gato.c13.value=="O")
		|| (document.gato.c21.value=="O" && document.gato.c22.value=="O" && document.gato.c23.value=="O")
		|| (document.gato.c31.value=="O" && document.gato.c32.value=="O" && document.gato.c33.value=="O")
		|| (document.gato.c11.value=="O" && document.gato.c22.value=="O" && document.gato.c33.value=="O")
		|| (document.gato.c13.value=="O" && document.gato.c22.value=="O" && document.gato.c31.value=="O")){
		ganador="O";
	}
	else
		ganador="0";
}