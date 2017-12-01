var inicia=function(){
	var entrada=function(){
		//Los datos que van a ir de entrada:
		var usuario=$("#txtUsuario").value();
		var clave=$("#txtClave").value();
		var parametros="opc=valida"+
						"&usuario="+usuario+
						"&clave="+clave+
						"&id="+Math.random();
		$.ajax({
			url: 'localhost/pw/php/entrada.php',
			dataType: 'json',
			success:function(data){
			
			},
			error: function(a,b,c){
			
			}
		});
	}
	$("#btnEntrar").on("click",entrada);
}
$(document).ready(inicia);//incializa JQuery.