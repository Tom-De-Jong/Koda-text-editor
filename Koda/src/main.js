const { invoke } = window.__TAURI__.core;

let gutterWrapper = document.querySelector(".gutterWrapper")
let textareaglobal = document.querySelector(".textarea")
let markdownPreview = document.querySelector(".markdownPreview")
let markdownMode = false;

console.log("script works girly")


//saves the file to the path when topbar save button is clicked
document.querySelector(".saveFile").addEventListener("click", () => {
saveFile();
})


//function for saving files
function saveFile(){

  let filepath = document.querySelector(".textarea").getAttribute("filepath");
  let text = document.querySelector(".textarea").value;

  invoke('save_text_file', { file_path: filepath, text: text })
  
}

// ctrl + thing functions
document.onkeydown = keydown;

let zoomnumber = 1;

function keydown(evt){
  evt = evt || window.event;

  if (evt.ctrlKey && evt.keyCode==83){ //CTRL+S
    saveFile();
    alert("File saved"); 

  } else if (evt.ctrlKey && (evt.keyCode==61 || evt.keyCode==187)){

    if (zoomnumber <= 5) {
    zoomnumber += 0.5;
    document.querySelector(".textWrapper").style.zoom = zoomnumber;
    console.log(zoomnumber);
    //zoom in
    }

  } else if (evt.ctrlKey && (evt.keyCode==173 || evt.keyCode==189)){
    
    if (zoomnumber >= 1) {
    zoomnumber -= 0.5;
    document.querySelector(".textWrapper").style.zoom = zoomnumber;
    console.log(zoomnumber);
    //zoom out
    }

  }

}


//save file as
document.querySelector(".saveFileAs").addEventListener("click", () => {

let text = document.querySelector(".textarea").value;

invoke('save_text_file_as', { text: text })

})

//opens file from filepath
document.querySelector(".openFile").addEventListener("click", () => {
  console.log("clicked");

  let filepath = "" //temporary
  invoke('get_text_file').then((message) => {
    console.log(message)
    let content = message.contents;
    let filepath = message.filepath;

    // check how many lines there are and add them when opening file
    let lines = content.split(/\n/);
    console.log(lines);

    gutterWrapper.innerHTML = "";

    for (let i = 0; i < lines.length; i++) {
      let newGutter = document.createElement("div")
      newGutter.className = "gutter"
      newGutter.innerHTML = (i + 1) + "."

      gutterWrapper.appendChild(newGutter);

    }

    textareaglobal.value = content;
    textArea.setAttribute("filepath", filepath);
  });;


})

document.querySelector(".switchMarkdown").addEventListener("click", () => {
  markdownMode = !markdownMode;
  if (markdownMode == true) {
    document.querySelector(".markdownPreview").style.display = "block";
  } else {
    document.querySelector(".markdownPreview").style.display = "none";
  }
})

// this is the script that makes sures lines get added when you press enter and handles markdown
let textArea = document.querySelector(".textarea");

textArea.addEventListener("input", (event) => {
  //markdown with regex with the help of ai slop XD
  if (markdownMode == true) {
    let mdValue = textArea.value;

    mdValue = mdValue.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    mdValue = mdValue.replace(/^######\s?(.*)$/gm, "<h6>$1</h6>")
      .replace(/^#####\s?(.*)$/gm, "<h5>$1</h5>")
      .replace(/^####\s?(.*)$/gm, "<h4>$1</h4>")
      .replace(/^###\s?(.*)$/gm, "<h3>$1</h3>")
      .replace(/^##\s?(.*)$/gm, "<h2>$1</h2>")
      .replace(/^#\s?(.*)$/gm, "<h1>$1</h1>")
      .replace(/^>\s?(.*)$/gm, "<blockquote>$1</blockquote>")
      .replace(/^---$/gm, "<hr>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/__(.+?)__/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/_(.+?)_/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^(?:\*|\+|-)\s+(.*)$/gm, '<li data-ul="1">$1</li>')
      .replace(/^\d+\.\s+(.*)$/gm, '<li data-ol="1">$1</li>');

    mdValue = mdValue.replace(/(<li data-ul="1">.*<\/li>\n?)+/g, (match) => {
      return "<ul>" + match.replace(/ data-ul="1"/g, "") + "</ul>";
    });

    mdValue = mdValue.replace(/(<li data-ol="1">.*<\/li>\n?)+/g, (match) => {
      return "<ol>" + match.replace(/ data-ol="1"/g, "") + "</ol>";
    });

    mdValue = mdValue.replace(/\n/g, "<br>");
    markdownPreview.innerHTML = mdValue;
  } else {
    markdownPreview.innerHTML = "";
  }


  // linechecker
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

  //wordcount
  let wordCount = textArea.value.trim().split(/\s+/).filter(word => word.length > 0).length + " wrds";
  document.querySelector(".wordCount").innerHTML = wordCount;

})