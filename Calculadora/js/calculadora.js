//variable global (está declarada arriba de todas las funciones y
//se puede mandar llamar de todas las funciones).
var operador=""; 
function numeros(num){
	if(operador==""){//operando1.
		var valorInicial=document.calculadora.operando1.value;
		if(valorInicial==0)
			document.calculadora.operando1.value="";
		//también se sigue la jerarquía de los elementos.
		//le concatena los valores de num con los del operando1
		document.calculadora.operando1.value=document.calculadora.operando1.value + num;
	}
	else{//operando2.
		var valorInicial=document.calculadora.operando2.value;
		if(valorInicial==0)
			document.calculadora.operando2.value="";
		document.calculadora.operando2.value=document.calculadora.operando2.value + num;
	}
}
function operadores(ope){
	operador=ope;
}