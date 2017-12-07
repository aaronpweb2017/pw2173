var iniciaMenu = function(){
	var alta = function(){
		$("#altas").show("slow");
	}
	var altaAlumno = function(){
		var ncontrol=$("#txtNcontrol").val();
		var nombre=$("#txtNombre").val();
		var carrera=$("#txtCarrera").val();
		var clave=$("#txtClave").val();
		var parametros="opc=altaalumno"+
					   "&ncontrol="+ncontrol+
					   "&nombre="+nombre+
					   "&carrera="+carrera+
					   "&clave="+clave+
					   "&id="+Math.random();
		$.ajax({
			 url:"php/altaalumno.php",
			 dataType: 'json', //retorno
			 type: "POST", //lo que enviamos
			 data:parametros,
			 success:function(data){
			 	if(data.respuesta == true){
			 		alert("Alumno dado de alta");			 		
			 	}else{
			 		alert("No se pudo dar de alta");
			 	}
			 },
			 error:function(a,b,c){
			 	alert("No se pudo conectar al server");
			 }
		});

	}
	var teclaNcontrol=function(tecla){
		if(tecla.which==13) //13=Enter.
		{

			var ncontrol=$("#txtNcontrol").val();
			var parametros="opc=buscaNcontrol"+"&ncontrol="+ncontrol+"&id="+Math.random();
			$.ajax({
			 	url:"php/buscancontrol.php",
			 	dataType: 'json', //retorno
			 	type: "POST", //lo que enviamos
			 	data:parametros,
			 	success:function(data){
			 		if(data.respuesta == true){
			 			$("#txtNombre").val=(data.nombre);	
			 			$("#txtCarrera").val=(data.carrera);	 		
			 			$("#txtClave").val=(data.clave);
			 		}else{
			 			
			 		}
			 	},
			 	error:function(a,b,c){
			 		alert("No se pudo conectar al server.");
				}
			});
		} 
	}
	//keypress --> Evento cuando presionas una tecla...
	$("#txtNcontrol").on("keypress", teclaNcontrol);
	$("#btnAlta").on("click",alta);
	$("#btnAltaAlumno").on("click",altaAlumno);
}

$(document).ready(iniciaMenu);