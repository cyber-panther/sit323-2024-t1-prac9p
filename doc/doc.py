import os

def get_files_in_folder(folder_path):
    """Get a list of all files in the folder."""
    return [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]

def write_content_to_file(output_file, folder_path):
    """Write the title and content of each file in the folder to the output file."""
    with open(output_file, 'w') as outfile:
        for filename in get_files_in_folder(folder_path):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r') as infile:
                title = filename
                content = infile.read()
                outfile.write(f"Title: {title}\n")
                outfile.write("Content:\n")
                outfile.write(content)
                outfile.write("\n\n")

if __name__ == "__main__":
    folder_path = input("Enter the folder path: ")
    output_file = "combined_output.txt"
    write_content_to_file(output_file, folder_path)
    print(f"All files in '{folder_path}' have been combined into '{output_file}'")
