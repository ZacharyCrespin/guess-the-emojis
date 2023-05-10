import os
import shutil

emojis_dir = './emojis'

for emoji_name in os.listdir(emojis_dir):
    emoji_dir = os.path.join(emojis_dir, emoji_name)
    
    if not os.path.isdir(emoji_dir):
        continue
        
    # Move contents of 3D folder to emoji folder
    folder_3d = os.path.join(emoji_dir, '3D')
    if os.path.isdir(folder_3d):
        for item in os.listdir(folder_3d):
            src = os.path.join(folder_3d, item)
            dst = os.path.join(emoji_dir, item)
            shutil.move(src, dst)
        os.rmdir(folder_3d)
        
    # Move contents of Default folder to emoji folder
    folder_default = os.path.join(emoji_dir, 'Default')
    if os.path.isdir(folder_default):
        for item in os.listdir(folder_default):
            src = os.path.join(folder_default, item)
            dst = os.path.join(emoji_dir, item)
            shutil.move(src, dst)
        os.rmdir(folder_default)
        
    # Remove remaining folders
    for folder_name in ['Color', 'Flat', 'High Contrast', 'Light', 'Medium-Dark', 'Medium-Light', 'Medium', 'Dark']:
        folder_path = os.path.join(emoji_dir, folder_name)
        if os.path.isdir(folder_path):
            shutil.rmtree(folder_path)

# Iterate through each emoji folder
for emoji_folder in os.listdir(emojis_dir):
    emoji_folder_path = os.path.join(emojis_dir, emoji_folder)

    # Iterate through each file in the emoji folder
    for file in os.listdir(emoji_folder_path):
        file_path = os.path.join(emoji_folder_path, file)

        # Check if the file is a PNG and contains "_default" or "_3d"
        if file.endswith(".png") and ("_default" in file or "_3d" in file):

            # Remove the "_default" or "_3d" from the file name
            new_file_name = file.replace("_default", "").replace("_3d", "")
            new_file_path = os.path.join(emoji_folder_path, new_file_name)

            # Rename the file
            os.rename(file_path, new_file_path)