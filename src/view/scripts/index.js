var connection = new WebSocket('ws://localhost:3005/sitdown');
connection.onopen = function(){
    console.log('Connection opened!');
}
connection.onclose = function(){
    console.log('Connection closed');
}
connection.onmessage = function(e){
    var data = JSON.parse(e.data);
    var total = data.total;
    var available = data.available;
    var percentage = 100 - (available/total)*100;
    document.getElementById("percentage").style.width = percentage.toString() + "%";
    document.getElementById("total").innerHTML = total;
    document.getElementById("available").innerHTML = available;

    document.getElementById("bar").setAttribute("p", percentage + "%");
}