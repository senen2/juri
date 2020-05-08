/**
 * @author botpi
 */

/*-------------------- index
*/    
function Login(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/Login(" + encabezado + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function nada() 
{
	var a =5;
}

function LeeUltTextoJ(num, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeUltTextoJ(" + num + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function LeeDocsJ(funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeDocsJ()?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function LeeDocJ(id, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeDocJ(" + id + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function DespacharP(idpedido, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/DespacharP(" + encabezado + "," + idpedido + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function SubeArchivoP(file, funcion)
{
	var datos = {}
	var reader = new FileReader();

	reader.addEventListener("load", function () {
		var d = JSON.stringify(reader.result);
		//var s = d.split('\\r\\n');
		var l = d.length;
		var x = d.substr(1,80000);
		var y = d.substr(80000,l);
		var h = y.length;
		var z = typeof d;
		//datos['file'] = x;
		datos['texto'] = x; // "casa bonita";
		datos['texto2'] = y;
	    $.post( 'http://' + servidor + '/functiond/SubeArchivoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
	        .always(function(response){
	            funcion(response);
	        }); 
	}, false);

	if (file) {
		reader.readAsBinaryString(file);
	}
}

function CambiaCampoP(campo, tabla)
{
	var datos = {}
	datos['nombre'] = campo.id;
	datos['val'] = campo.value;
	datos['tabla'] = tabla;
	datos['telefono'] = $("#telefono").val();
    $.post( 'http://' + servidor + '/functiond/CambiaCampoP(' + encabezado + ')?pagina=' + pagina, JSON.stringify(datos))
        .always(function(){
            nada();
        }); 
}

function LeeCliP(telefono, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeCliP('" + telefono + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
/*
function CambiaCampoCliP(campo, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/CambiaCampoCliP('" + campo.id + "','" + campo.val + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
*/
function ReadLikesP(ventrada, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/ReadLikesP(" + idprov + ",'" + ventrada + "'" + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function LeeProductoP(idproducto, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeProductoP("+ idprov + ',' + idproducto + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function EnviarPedP(funcion)
{
	var datos = {},	ped = [];
	datos['idprov'] = gcli.prov[0].id;
	datos['idcli'] = gcli.cli.id;
	datos['ped'] = ped;

	$.each(gpedido, function(i, item) {
		var p = {};
		p.id = item.id;
		p.precio = item.precio;
		p.cantidad = item.cantidad;
		ped.push(p)
	});

    $.post( 'http://' + servidor + '/functiond/EnviarPedP()?pagina=' + pagina, JSON.stringify(datos))
        .always(function(){
            funcion();
        }); 
}
