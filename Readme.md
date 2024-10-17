# Real-Time Video/Audio Translation App

## Overview
This application empowers users to upload video or audio files, automatically transcribe them using the Whisper engine, and translate the transcription into multiple languages via the LibreTranslate API. It features a user-friendly web interface for seamless file uploads, language selection, and real-time display of translated text.

## Key Features
- **File Upload**: Supports uploading audio and video files for processing.
- **Transcription**: Converts audio to text using the Whisper transcription engine.
- **Translation**: Automatically translates transcribed text into a target language of your choice using the LibreTranslate API.
- **Language Support**: Includes multiple languages such as French, Spanish, German, Chinese, Japanese, and more.
- **User-Friendly Interface**: A clean and minimalistic web interface for easy interaction.

## Project Structure
real-time-translation-app/
│ 
├── backend/ 
│ ├── uploads/ # Stores uploaded files and transcription results
│ └── server.js # Express.js server handling file uploads and processing 
│ ├── frontend/ 
| ├── Translation-backend
| ├── translation_models
│ └── index.html # Web interface for user interactions
│ └── README.md # Project documentation


## Requirements
Before you begin, ensure that you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** (bundled with Node.js)
- **Whisper** (for transcription)
- **Internet connection** (for the LibreTranslate API)

## Installation and Setup
1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/real-time-translation-app.git

2. **Navigate to the project directory**:
   ```
    cd real-time-translation-app
   ```

4. **Install the required dependencies: In the backend/ directory, run the following command**:
   ```
   npm install
   ```
5. **Start the server: To run the Express.js server, navigate to the backend/ directory and execute**:
   ```
   node server.js
    ```
7. **Access the application: Open your browser and navigate to**:
   ```
   http://localhost:3000
   ```
*This will display the web interface where you can upload files and select a target language.*

## How It Works
**Upload File**: Select an audio or video file (supported formats include .mp3, .wav, .mp4, etc.).
**Choose Language**: Pick a target language for translation from the dropdown list (e.g., French, Spanish, etc.).
**Submit**: The file is processed by the Whisper transcription engine, and the transcribed text is automatically translated into the selected language.
**View Result**: The translated text will be displayed on the screen after processing.

## Error Handling and Timeouts
**File Upload Errors**: If no file is selected or the upload fails, the app will notify the user with an error message.
**Timeout for Long Processes**: If transcription takes too long (over 2 minutes), the process will be automatically terminated, and an error message will be displayed.
**Translation Issues**: If translation fails due to connectivity or API issues, a descriptive error message will be shown.
Customization

*You can add support for more languages by editing the dropdown in the frontend/index.html file. Simply add new <option> elements corresponding to the language codes supported by LibreTranslate.*




## Setting Up the Translation Backend Server

[if any error comethen do this!!]
**To get this working on your machine uninstall the Python verson installes on the machine and download the [python 3.11.9](https://www.python.org/downloads/)version from official website**

Trick to uninstall current version of python from your Machine: 
(Only work if any-version of python is already installed in your machine if you never download the python in your machine simple download above version directly)
First go to cmd run `python --version`` check the version already installed in your machine then go to Python official website and then download the version that is already persent in your machine and then it will download the [python-x.xx.x-amd64.exe] file, click on it Open it there you will see 3 option select last option of uninstall type text and there you go you succesfully uninstalled that version on your machine and after this done check the python version one more time you will get error now because now after doing this you don't have python in your machine now you can download this [python 3.11.9](https://www.python.org/downloads/)version from official website and then you are good to goo!!

1. **Create a Folder for the Backend at root directory:**
   Navigate to your project directory and create two folders named as 
- `Translation_backend`: Here we will install LibreTranslate Locally
- `translate_models`: Here we will get our all translation model of LibreTranslate


## Translation_backend

### Now run this in root directory

   ``` 
   mkdir Translation_backend  
   cd Translation_backend 
   ```

2. **Clone LibreTranslate: Clone the LibreTranslate repository into the Translation_backend folder**:

   ``` 
   git clone https://github.com/LibreTranslate/LibreTranslate.git 
   ```
3. **Install Dependencies: Navigate into the cloned LibreTranslate directory and install the required dependencies**:

   ```
   cd LibreTranslate
   pip install .   
   ```
### 3.1 Additional :
   `Install Flask-CORS` **Open your terminal or command prompt and run the following command:**
   `
   pip install Flask-CORS
   `
   **after this edit the whole** `main.py` file located at **translation_backend/LibreTranslate/main.py**

   ```
import os
from flask import Flask, request, jsonify
from libretranslate import main as libretranslate_main
from argostranslate import package
from flask_cors import CORS

# Initialize the LibreTranslate server
app = libretranslate_main()  # This might need to be adapted based on the package structure
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

def load_models(models_path):
    # Ensure the models path exists
    if not os.path.exists(models_path):
        print(f"Models path does not exist: {models_path}")
        return
    
    # Load all models from the specified directory
    for model_file in os.listdir(models_path):
        if model_file.endswith(".argosmodel"):  # Ensure you're looking for the correct model files
            package.install_from_path(os.path.join(models_path, model_file))

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('q')
    target = data.get('target')
    source = data.get('source')

    # Validate input
    if not text or not target:
        return jsonify({'error': 'Text and target language must be provided.'}), 400

    # Perform the translation using Argos Translate
    try:
        translated_text = package.translate(text, target, source)  # Adjust this call as per your model usage
        return jsonify({'translatedText': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    # Specify the path where your Argos Translate models are located 
    models_path = r'D:\Real_Time_Translation_App\translate_models\translate_models'  # Adjust the path accordingly
    
    # Load the translation models
    load_models(models_path)

    # Start the LibreTranslate server
    app.run(port=5000, host='0.0.0.0', debug=True)  # Explicitly start the Flask app on port 5000

```
### check this line in above main.py file and chnage the location according to your Directory location
```
# Specify the path where your Argos Translate models are located 
models_path = r'D:\Real_Time_Translation_App\translate_models\translate_models'  # Adjust the path accordingly
```

### 3.2 Additional Now we set up translate_backend
   ```
   cd translate_backend/LibreTranslate 
   ```
after this command you have to run this command:

   ```
   python -m venv env
   ```
and then active the ven env by
   ```
   .\env\Scripts\activate
   ```
then
   ```
   pip install argostranslate
   git clone https://github.com/argosopentech/argos-translate.git
   ```

then go to this location 
   ```
   cd translate_backend/LibreTranslate/argos-translate
   ```

 **next: make sure you has activated the (env) should look like this ![image](https://github.com/user-attachments/assets/a247a014-feb2-4fb5-a9b7-5f55a09692ee) and then run below command**
   ```
   pip install -e . 
   ```
 
   
## translate_models 

Now we set up the models for it, first run this command if not done
   ```
 mkdir translate_models
 cd translate_models
   ```

**then make a file inside it names as "setup_language_packages.py" ** 
and then copy paste below code 
working of code: First it will Download all models completely and then shows it dowloaded location(per download) and then after downloading all 92 models then move it from its location to inside our `translate_models` folder . Keep Patience each model takes approx 500mb,800mb,1.1Gb space
### Will take some time to downloade the model and then will take some more time to move it!!

```
import os
import shutil
import logging
import asyncio
from argostranslate import package

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Define the directory where you want to move the downloaded models
TARGET_DIR = os.path.join(os.getcwd(), 'translate_models')

def update_package_index():
    """Fetch available language packages with error handling."""
    try:
        logging.info("Updating language package index...")
        available_packages = package.get_available_packages()
        logging.info(f"Found {len(available_packages)} available language packages.")
        return available_packages
    except Exception as e:
        logging.error(f"Failed to update package index: {str(e)}")
        return []

def check_existing_models(target_dir):
    """Check for existing downloaded models in the target directory."""
    try:
        if os.path.exists(target_dir) and os.listdir(target_dir):
            logging.info(f"Existing models detected in: {target_dir}")
            return True  # Models exist
        return False  # No models found
    except Exception as e:
        logging.error(f"Error checking models in {target_dir}: {str(e)}")
        return False

async def install_language_package(language_package):
    """Download and install the specified language package."""
    try:
        logging.info(f"Attempting to install: {language_package.from_code} -> {language_package.to_code}")

        # Check if the package is already installed
        installed_packages = package.get_installed_packages()
        if any(p.from_code == language_package.from_code and p.to_code == language_package.to_code for p in installed_packages):
            logging.info(f"Package {language_package.from_code} -> {language_package.to_code} is already installed.")
            return None

        # Download and install the package directly
        package_path = language_package.download()
        if not package_path:
            logging.error(f"Failed to download package {language_package.from_code} -> {language_package.to_code}.")
            return None

        # Install the package
        package.install_from_path(package_path)
        logging.info(f"Successfully installed {language_package.from_code} -> {language_package.to_code}")

        return package_path
    except Exception as e:
        logging.error(f"Failed to install {language_package.from_code} -> {language_package.to_code}: {str(e)}")
        return None

def move_package_to_target(source_path, target_dir, language_package):
    """Move the downloaded package to the specified target directory."""
    if not source_path or not os.path.exists(source_path):
        logging.warning(f"Source path invalid: {source_path}")
        return None
    
    try:
        # Create a new directory for this specific package
        package_folder_name = f"{language_package.from_code}_to_{language_package.to_code}"
        package_folder_path = os.path.join(target_dir, package_folder_name)

        # Create target directory if it doesn't exist
        os.makedirs(package_folder_path, exist_ok=True)

        # Move the package to the new directory
        shutil.move(source_path, package_folder_path)
        logging.info(f"Moved package to {package_folder_path}.")
        return package_folder_path
    except Exception as e:
        logging.error(f"Error moving package from {source_path} to {target_dir}: {str(e)}")
        return None

async def main():
    """Main function to handle the workflow of installing and moving language packages."""
    try:
        # Check for existing models
        if check_existing_models(TARGET_DIR):
            return  # Exit if models are already present

        # Update package index and install packages
        available_packages = update_package_index()
        if not available_packages:
            logging.warning("No available language packages found.")
            return

        tasks = [install_language_package(language_package) for language_package in available_packages]

        # Run the download tasks concurrently
        downloaded_paths = await asyncio.gather(*tasks)

        # Move the downloaded packages
        for source_path, language_package in zip(downloaded_paths, available_packages):
            if source_path:
                new_location = move_package_to_target(source_path, TARGET_DIR, language_package)
                if new_location:
                    logging.info(f"Package moved to {new_location}")
                else:
                    logging.warning(f"Failed to move package from {source_path}")

        logging.info("All packages have been processed successfully.")

    except Exception as e:
        logging.critical(f"An unexpected error occurred: {str(e)}", exc_info=True)

if __name__ == "__main__":
    asyncio.run(main())


```

**Then Run this command**
```
python setup_language_packages.py
```

## Additional we have to set 'argos-translate' and 'argospm' to our path environment variables so that it can be access gloabaly in our system
Simply open new cmd at root of project run this command
```
where python
```
it will show you the location then open it on file-explorer and then check `argo-translate` and `argospm` copy the path of these two folder by doing right click on it and then select copy-path and then place it inside path

run on windows search
```
edit the system environment variables
```
1.Go to Environment Variables on your computer.
2. Find Path under both User and System variables (you need to do this step twice: once for each).
3. Select Path, click Edit, and then click New.
4. Paste the location path (which you copied by right-clicking and selecting Copy as path) for the argo-translate folder.
5. Click New again and repeat the process for the argospm folder.

**Do the same steps for both User and System variables. You need to click New twice each time.**
![377497898-000168d2-d1e2-4411-8bcd-3bf8851ef97d](https://github.com/user-attachments/assets/e9795bb3-879e-423b-83e5-e037aa0e29f0)

 
`D:\Python 311\Scripts\argos-translate` and `D:\Python 311\Scripts\argospm` and place it inside your path environment 

## should look like this for both System and User variables
![Screenshot 2024-10-17 193618](https://github.com/user-attachments/assets/5d7b76bd-2a2d-461f-98e4-7b6dc241ae6a)


4. **Recheck the whipser Installation at root dir** 
**Install Whisper: Ensure you have Whisper installed for transcription**:

   ```
   pip install git+https://github.com/openai/whisper.git
   ```
5. **then Open new cmd console and go to (at root)**

```
cd Translation_backend/LibreTranslate
```` 
  **Run the Backend: Execute the main.py file to start the Flask application:**

   ```
   python main.py
   ```

   
# Future Improvements

**Audio Output**: Generate translated audio versions of the transcribed content.
**Live Streaming Support**: Extend the app's functionality to support real-time translation of live audio and video streams.
**Multi-File Upload**: Allow users to upload multiple files at once for batch processing.
**Improve frontend design for a better user experience.**
**Add more language options for translation.**
**Implement error handling and loading indicators.**

## License
*This project is open-source and available under the MIT License.*


### Notes:
- This formatting uses Markdown elements such as headers, bullet points, and code blocks to enhance readability.
- Make sure to replace `your-username` with your actual GitHub username in the clone command.
- You can further customize sections to suit your project’s specifics.

Feel free to modify any sections as needed!
