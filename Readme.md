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
### 3.1 Additionalon :
   ```
   Install Flask-CORS
   ```

   **Open your terminal or command prompt and run the following command:**
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
    models_path = r'D:\Real_Time_Translation_App\translate_models'  # Adjust the path accordingly
    
    # Load the translation models
    load_models(models_path)

    # Start the LibreTranslate server
    app.run(port=5000, host='0.0.0.0', debug=True)  # Explicitly start the Flask app on port 5000

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

and then after create a file in this folder `translate_models`
and paste below code

```

```









# until next consideration 
4. **Install Whisper: Ensure you have Whisper installed for transcription**:

   ```
   pip install git+https://github.com/openai/whisper.git
   ```
5. **Run the Backend: Execute the main.py file to start the Flask application:**

   ```
   python main.py
   ```

   
## Future Improvements

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
