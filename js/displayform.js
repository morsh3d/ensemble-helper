document.getElementById("add").onclick  = function() {
    
    var node = document.createElement("Li");
    var text = document.getElementById("user_input").value; 
    var textnode=document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("list_item").appendChild(node);
}