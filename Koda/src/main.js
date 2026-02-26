const { invoke } = window.__TAURI__.core;

let gutterWrapper = document.querySelector(".gutterWrapper")
let textareaglobal = document.querySelector(".textarea")

console.log("script works girly")

// function openFile() {
//   let filepath = "/home/tom/Documents/Koda-text-editor/README.md" //temporary
//   invoke('get_text_file', { invokeMessage: filepath }).then((message) => console.log(message));;
// }

document.querySelector(".openFile").addEventListener("click", () => {
  console.log("clicked");

  let filepath = "/home/tom/Documents/Koda-text-editor/README.md" //temporary
  invoke('get_text_file', { file_path: filepath }).then((message) => {
    console.log(message)
    textareaglobal.innerHTML = message;
  });;


})

// this is the script that makes sures lines get added

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