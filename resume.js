// Store all executed commmands
var cmd_list = [];
var cmd_index = 0;
var available_cmd = ["about", "education", "projects", "experience", "skills", "contact", "download", "help", "clear"];

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
  // Number 38 is for 'Up Arrow' key on the keyboard
  else if(event.keyCode === 38) {
    // Cancel the default action, if needed
    event.preventDefault();
    cycle_command("up");
  }
  // Number 40 is for 'Down Arrow' key on the keyboard
  else if(event.keyCode === 40) {
    // Cancel the default action, if needed
    event.preventDefault();
    cycle_command("down");
  }
  // Number 9 is for "Tab" key on the keyboard
  else if(event.keyCode === 32 && event.ctrlKey) {
    // Cancel the default action, if needed
    event.preventDefault();
    tab_completion();
  }
});

function run_command(){
    var cmd = document.getElementById("command");    
    var input = cmd.value;
    var output;
    
    if(input != ''){
      // Get command from input field 
      var element = document.getElementById(input);
      
      // Error command, if command not found
      if(available_cmd.indexOf(input) < 0)
        element = document.getElementById('error'); 

      if(input == 'download')
        window.open('./resume.pdf', '_blank');
      else if(input == 'clear'){
        clear_console();
        return;
      }

      // Create a clone to show as command output
      output = element.cloneNode(true);
      output.style = "display:block";
    }

    // Get command output in HTML format
    var cmd_output = document.createElement("div");
    var container = document.createElement("div");
    var node = document.createTextNode(">> " + input);
    cmd_output.appendChild(container);
    container.appendChild(node);

    if(input != ''){
      cmd_output.appendChild(output);
      // Append input command to command list
      cmd_list.push(input);
    }

    // Append the command output to the executed commands div container
    var element = document.getElementById("executed_commands");
    element.appendChild(cmd_output);

    // Clear the command input field
    cmd.value = "";
    cmd_index = cmd_list.length - 1;

    // Scroll to the end
    var scrollingElement = (document.scrollingElement || document.body);
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

// Cycle through commands list using arrow keys
function cycle_command(direction){
  if(direction === "up"){
    if(cmd_index > 0)
      cmd_index -= 1;
  }
  else if(direction === "down"){
    if(cmd_index < cmd_list.length - 1)
      cmd_index += 1;
  }

  // console.log(cmd_list);
  // console.log(cmd_list.length);
  // console.log(cmd_index);

  // Update input
  var cmd = document.getElementById("command");
  cmd.value = cmd_list[cmd_index];
}

function tab_completion(){
  // Get input
  var cmd = document.getElementById("command");    
  var input = cmd.value;
  
  for (index = 0; index < available_cmd.length; index++) { 
    if(available_cmd[index].startsWith(input)){
      cmd.value = available_cmd[index];
      //console.log(available_cmd[index]);
      break;
    }
  }
}

function clear_console(){
  document.getElementById("executed_commands").innerHTML = "";
  document.getElementById("command").value = "";
}