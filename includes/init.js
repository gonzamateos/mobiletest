document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Alert Bienvenida
    console.log("Este es un prototipo de la aplicación. Los datos no son reales y las funcionalidades no se encuentran implementadas.");
    
    /* Permisos */
    $.mobile.defaultPageTransition   = 'slide';

    $("#moovit").on("click", function() {
        //window.OpenApplication('com.tranzmate');
        return false;
    });
    $("#portrait").on("click", function() {
        screen.lockOrientation('portrait');
        return false;
    });
    $("#landscape").on("click", function() {
        screen.lockOrientation('landscape');
        return false;
    });

}