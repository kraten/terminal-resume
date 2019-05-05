// Get the input field
var cmd = document.getElementById("command");
// Execute a function when the user releases a key on the keyboard
cmd.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    run_command();
  }
});


function run_command(){
    var cmd = document.getElementById("command");    
    var input = cmd.value;
    var output;

    // Get command from input field 
    var element = document.getElementById(input);
    //console.log(element);

    // Error command, if command not found
    if(element == null)
        element = document.getElementById('error');
    
    if(input == 'download')
        window.open('./resume.pdf', '_blank');


    // Create a clone to show as command output
    output = element.cloneNode(true);
    output.style = "display:block";

    // Get command output in HTML format
    var cmd_output = document.createElement("div");
    var container = document.createElement("div");
    var node = document.createTextNode(">> " + input);
    cmd_output.appendChild(container);
    container.appendChild(node);
    cmd_output.appendChild(output);

    // Append the command output to the executed commands div container
    var element = document.getElementById("executed_commands");
    element.appendChild(cmd_output);

    // Clear the command input field
    cmd.value = "";

    // Scroll to the end
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

