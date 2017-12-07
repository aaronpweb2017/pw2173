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
	$("#btnAlta").on("click",alta);
	$("#btnAltaAlumno").on("click",altaAlumno);
}

$(document).ready(iniciaMenu);