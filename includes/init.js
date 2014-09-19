document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Alert Bienvenida
    console.log("Este es un prototipo de la aplicación. Los datos no son reales y las funcionalidades no se encuentran implementadas.");
    
    /* Permisos */
    $.mobile.allowCrossDomainPages = true;
    $.mobile.defaultPageTransition   = 'slide';

    /* Updates *********************************************************************************
    if(navigator.connection.type!=Connection.NONE){
            console.log("Móvil online. Actualizar...");
    }else{
            console.log("Móvil offline...");
    }/**/

}