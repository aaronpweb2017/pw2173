<?php
	include 'conexion.php';
	include 'utileria.php';
	function guardaAlumno()
	{
		$respuesta = false;
		$ncontrol=GetSQLValueString($_POST["ncontrol"],"text");
		$nombre=GetSQLValueString($_POST["nombre"],"text");
		$carrera=GetSQLValueString($_POST["carrera"],"int");
		$clave=GetSQLValueString(md5($_POST["clave"]),"text");
		$conexion=conectaBD();
		$consulta=sprintf("insert into alumnos values(%s,%s,%d,%s)",$ncontrol,$nombre,$carrera,$clave);
		$resConsulta=mysqli_query($conexion,$consulta);
		if(mysqli_affected_rows($conexion) > 0){
			$respuesta=true;
		}
		$salida = array('respuesta' => $respuesta );
		print json_encode($salida);
	}
	$opc=$_POST["opc"];
	switch ($opc) {
		case 'altaalumno':
			guardaAlumno();
			break;
		
		default:
			# code...
			break;
	}
?>