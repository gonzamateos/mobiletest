/* Clase para insert en batch desde xml
 * Ej: 
    var dbController = new DBController();
    dbController.init("hayquipo");
 * 
 * <sql>
 *  <statement>create blah blahh</statement>
 * </sql>
 * 
 * Gonza
 * 
 **/
var db;
var dbname;
var dbController;
var dbResponse;
var last_insert_id;
var stepactual;
var steps = ['Instalando' , 'Bienvenido!'];

function DBController() {
    
    this.init = function(name){
        dbname= name;
        db = window.openDatabase(name, "1.0", name, 700000);
        /*/para reinstalar
        window.localStorage.setItem("install", 0);
        this.clearDB();//*/
        
        var value = window.localStorage.getItem("install")*1;
        if(value < steps.length){
            stepactual = value;
            dbController.executeBatch(stepactual);
        }
    };
    this.clearDB = function(){
        /*clear database*/
        db = window.openDatabase(dbname, "1.0", dbname, 700000);
        
        db.transaction(function(tx) {
          tx.executeSql('DROP TABLE IF EXISTS stats');
          tx.executeSql('DROP TABLE IF EXISTS mysessions');
        }, function(){  }, successHandler);
    };
    this.executeBatch = function(sx) {
        var path;
        var mensaje = steps[sx];
        stepactual = sx;
        if(sx==0){
            path = 'includes/createtables.xml';
        }else{
            path = 'includes/inserts'+sx+'.xml';
        }
        
        if(path){
            if(mensaje != '' && mensaje != undefined){
                $('#popup').addClass('instalando');
                openPopup('<p>'+mensaje+'</p>');
            }
            $.get(path, {}, this.gotFile, "xml");
        }
    };
    this.get_last_insert_id = function(){
        db.transaction(function(tx){
            var query = "SELECT last_insert_rowid() as last_id";
            tx.executeSql(query, [], function(tx, results){
                if(results.rows.length > 0){
                    last_insert_id = results.rows.item(0).last_id;
                }
            }, errorCB);
        }, errorCB);
    };
    this.dbquery = function(query){
        dbResponse = {
            row: []
        };
        db.transaction(function(tx){
            tx.executeSql(query, [], function(tx, results){
                if(results.rows.length > 0){
                    i = 0;
                    while(i < results.rows.length){
                        console.log(results.rows.item(i).segs);
                        dbResponse.row[i] = results.rows.item(i);
                        i++;
                    }
                    console.log(dbResponse);
                }
                
            }, errorCB);
        }, errorCB);
    };
    this.gotFile = function(doc) {
        var statements = [];
        var statementNodes=doc.getElementsByTagName("statement");
        for(var i=0; i<statementNodes.length; i++) {
            statements.push(statementNodes[i].textContent);
        }
        if(statements.length) {
            db = null;
            console.log('conectado a: ' + dbname);
            db = window.openDatabase(dbname, "1.0", dbname, 700000);
            db.transaction(function(tx) {
              //do nothing
              for(var i=0;i<statements.length;i++) {
                 console.log(statementNodes[i].textContent);
                 tx.executeSql(statements[i]);
              }
            }, errHandler, function(){
                stepactual++;
                window.localStorage.setItem("install", stepactual);
                if(steps[stepactual]==undefined){
                    successHandlerDump();
                }else{
                    dbController.executeBatch(stepactual);
                }
                
            });
        }
    };

};

function errHandler(err){
    console.log('errHandler:'+JSON.stringify(err));
}

function successHandler(){
    console.log('successHandler()');
}

function successHandlerDump(){
    closePopup();
    $('#popup').removeClass('instalando');
}
/*
function updateDB(sql_){
    db.transaction(function(tx){
        tx.executeSql(sql_);
    }, errorCB);
}

function get_last_insert_id(){
    db.transaction(function(tx){
        var query = "SELECT last_insert_rowid() as last_id";
        tx.executeSql(query, [], function(tx, results){
            if(results.rows.length > 0){
                last_insert_id = results.rows.item(0).last_id;
            }
        }, errorCB);
    }, errorCB);
}*/


function errorCB(err) {
    //alert(err);
    console.log(err);
}