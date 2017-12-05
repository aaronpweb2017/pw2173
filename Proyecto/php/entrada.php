<?php
	include 'conexion.php'; //puede ser include (se incrusta el archivo) o require (no se incrusa):
	function validaEntrada(){
		$conexion=conectaBD();
		$respuesta=false;
		$usuario=$_POST["usuario"];
		$clave=md5($_POST["clave"]);
		$consulta="select ncontrol,clave from alumnos where ncontrol='".$usuario."' and clave='".$clave."' limit 1";
		$resConsulta=mysqli_query($conexion,$consulta); //jala todos los registros de la consulta.
		if(mysqli_num_rows($resConsulta) > 0){ //Si al menos traes un renglón está bien...
			$respuesta=true;
		}
		//Array asociativo (su índice es un nombre).
		$salida = array('respuesta' => $respuesta );
		print json_encode($salida);
	}
	//Las variables en PHP empiezan por $:
	$opc=$_POST["opc"];
	switch ($opc) {
		case 'valida':
			validaEntrada();
			break;
		
		default:
			# code...
			break;
	}
?>