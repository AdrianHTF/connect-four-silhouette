var socket;

$(function(){

    connect();

    function connect(){
        socket = new WebSocket("ws://localhost:9000/socket");
        socket.onopen = function(){
            message('Socket Status: '+socket.readyState+' (open)');
            }
        socket.onmessage = function(message){
            if (message.data == "update"){
                location.reload();
                console.log(message.data)
            }
            if(message.data.toString().startsWith("Player")){
                showDialog(message.data);
            }
            else{
                console.log(message.data)
                var grid = JSON.parse(message.data);
                buildGrid(grid);
            }

        }
        socket.onerror = function(){
        console.log(message.data)
        }
        socket.onclose = function(){
        socket.close()
        }
        function message(msg){
        			$('#wsLog').append('<p>' + msg +'</p>');
        		}

}

});

function showDialog(data) {
    swal({
        title: data,
        closeOnClickOutside: false,
        closeOnConfirm: false
        }, function(isConfirm){
            if (isConfirm) {
               window.location.reload();
           }
        });
}

$(function(){
    addListeners();

    function addListeners(){

        document.getElementById("0").addEventListener("click", function(){
            console.log("selected row 0");
            socket.send(0);
        })
        document.getElementById("1").addEventListener("click", function(){
             console.log("selected row 1");
             socket.send(1);
        })
        document.getElementById("2").addEventListener("click", function(){
             console.log("selected row 2");
             socket.send(2);
        })
        document.getElementById("3").addEventListener("click", function(){
             console.log("selected row 3");
             socket.send(3);
        })
        document.getElementById("4").addEventListener("click", function(){
             console.log("selected row 4");
             socket.send(4);
        })
        document.getElementById("5").addEventListener("click", function(){
             console.log("selected row 5");
             socket.send(5);
        })
        document.getElementById("6").addEventListener("click", function(){
             console.log("selected row 6");
             socket.send(6);
        })
        document.getElementById("BUTTONNEWGAME").addEventListener("click", function(){
            console.log("starting new game");
            socket.send("newGame")});

    }
});


function buildGrid(grid){
    var innerhtml = "";
    var k = 0;
    for (var i=0; i <= 5; i++){
        innerhtml += '<tr>'
        for (var j=0; j <= 6; j++){
            if(grid[j+k] == " "){
                innerhtml += '<td class = "EMPTYGRID"> <p>&nbsp</p> </td>'
            }
            if(grid[j+k] == "O"){
                innerhtml += '<td class = "REDGRID"> <p>&nbsp</p> </td>'
            }
            if(grid[j+k] == "X"){
                innerhtml += '<td class = "BLACKGRID"> <p>&nbsp</p> </td>'
            }
        }
        k += 7;
        innerhtml += '</tr>'
        }
    document.getElementById("grid").innerHTML = innerhtml;
}

