const { invoke } = window.__TAURI__.core;

let gutterWrapper = document.querySelector(".gutterWrapper")
let textareaglobal = document.querySelector(".textarea")

console.log("script works girly")


//saves the file to the path when topbar save button is clicked
document.querySelector(".saveFile").addEventListener("click", () => {
saveFile();
})


//function for saving files
function saveFile(){

  let filepath = "/home/tom/Documents/Koda-text-editor/README.md" //temporary
  let text = document.querySelector(".textarea").value;

  invoke('save_text_file', { file_path: filepath, text: text })
  
}

// ctrl + s save file
document.onkeydown = keydown;

function keydown(evt){
  if (!evt) evt = event;
  if (evt.ctrlKey && evt.keyCode==83){ //CTRL+S
    saveFile();
    alert("File saved"); 
  }

}

//opens file from filepath
document.querySelector(".openFile").addEventListener("click", () => {
  console.log("clicked");

  let filepath = "/home/tom/Documents/Koda-text-editor/README.md" //temporary
  invoke('get_text_file', { file_path: filepath }).then((message) => {
    console.log(message)

    // check how many lines there are and add them when opening file
    let lines = message.split(/\n/);
    console.log(lines);

    gutterWrapper.innerHTML = "";

    for (let i = 0; i < lines.length; i++) {
      let newGutter = document.createElement("div")
      newGutter.className = "gutter"
      newGutter.innerHTML = (i + 1) + "."

      gutterWrapper.appendChild(newGutter);

    }

    textareaglobal.innerHTML = message;
  });;


})

// this is the script that makes sures lines get added when you press enter

let textArea = document.querySelector(".textarea");

textArea.addEventListener("input", (event) => {

  console.log(textArea.value);

  let lines = textArea.value.split(/\n/);
  console.log(lines);


  gutterWrapper.innerHTML = "";

  for (let i = 0; i < lines.length; i++) {
    let newGutter = document.createElement("div")
    newGutter.className = "gutter"
    newGutter.innerHTML = (i + 1) + "."

    gutterWrapper.appendChild(newGutter);

  }

})