<?php
	include 'conexion.php';
	include 'utileria.php';
	function bajaalumno(){
		$respuesta = false;
		$ncontrol=GetSQLValueString($_POST["ncontrol"],"text");
		$conexion=conectaBD();
		$consulta=sprintf("delete from alumnos where ncontrol=%s",$ncontrol);
		$resConsulta=mysqli_query($conexion,$consulta);
		if(mysqli_affected_rows($conexion) > 0){
			$respuesta = true;
		}
		$salida = array('respuesta' => $respuesta );
		print json_encode($salida);
	}
	$opc=$_POST["opc"];
	switch ($opc) {
	case 'baja':
		bajaalumno();
		break;
	default:
		# code...
		break;
	}
?>