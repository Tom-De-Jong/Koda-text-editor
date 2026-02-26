// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use std::env;
use std::fs;
use rfd::FileDialog;
use serde_json::json;

// open file
#[tauri::command(rename_all = "snake_case")]
fn get_text_file() -> serde_json::Value{

    let mut files = FileDialog::new()
    .add_filter(
        "text",
        &[
            "txt", "md", "markdown", "log", "cfg", "ini", "json", "yml", "yaml",
            "xml", "toml", "csv", "tsv", "js", "ts", "jsx", "tsx", "html", "htm",
            "css", "scss", "less", "rs", "py", "rb", "java", "kt", "c", "h", "cpp",
            "hpp", "cc", "go", "swift", "php", "sh", "bash", "zsh", "fish", "sql",
        ],
    )
    .set_directory("/")
    .pick_file();

    if files.is_none() {
        return json!({
            "contents": "",
            "filepath": ""
        });
    }

    let path_str = files.as_mut().unwrap().display().to_string();

    // println!("file maybe {:?}", files);

    let contents = fs::read_to_string(files.as_mut().unwrap().display().to_string())
        .expect("Should have been able to read the file");

    // println!("With text:\n{contents}");
    let result = json!({
        "contents": contents,
        "filepath": path_str
    });

    result

}


//save file
#[tauri::command(rename_all = "snake_case")]
fn save_text_file(file_path: String, text: String){

    // println!("In file {file_path}");


    fs::write(&file_path, &text).expect("Should have been able to write the file");

    // println!("wrote file successfully");
}


//save file as
#[tauri::command(rename_all = "snake_case")]
fn save_text_file_as(text: String){

    let mut save_dir = FileDialog::new()
    .add_filter(
        "text",
        &[
            "txt", "md", "markdown", "log", "cfg", "ini", "json", "yml", "yaml",
            "xml", "toml", "csv", "tsv", "js", "ts", "jsx", "tsx", "html", "htm",
            "css", "scss", "less", "rs", "py", "rb", "java", "kt", "c", "h", "cpp",
            "hpp", "cc", "go", "swift", "php", "sh", "bash", "zsh", "fish", "sql",
        ],
    )
    .set_directory("/")
    .save_file();

    if save_dir.is_none() {
        println!("Save canceled");
        return;
    }

    let file_path = save_dir.as_mut().unwrap().display().to_string();
    fs::write(&file_path, &text).expect("Should have been able to write the file");

}



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_text_file, save_text_file, save_text_file_as])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
