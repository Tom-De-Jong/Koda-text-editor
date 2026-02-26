// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use std::env;
use std::fs;

#[tauri::command(rename_all = "snake_case")]
fn get_text_file(file_path: String) -> String{

    println!("In file {file_path}");

    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");

    println!("With text:\n{contents}");
    contents
}



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_text_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
