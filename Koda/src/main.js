const { invoke } = window.__TAURI__.core;

let gutterWrapper = document.querySelector(".gutterWrapper")


console.log("script works girly")

invoke('get_text_file', { file_path: '/home/tom/Documents/Koda-text-editor/README.md'});

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