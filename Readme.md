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
   ```bash
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

## Future Improvements

**Audio Output**: Generate translated audio versions of the transcribed content.
**Live Streaming Support**: Extend the app's functionality to support real-time translation of live audio and video streams.
**Multi-File Upload**: Allow users to upload multiple files at once for batch processing.

## License
*This project is open-source and available under the MIT License.*


### Notes:
- This formatting uses Markdown elements such as headers, bullet points, and code blocks to enhance readability.
- Make sure to replace `your-username` with your actual GitHub username in the clone command.
- You can further customize sections to suit your project’s specifics.

Feel free to modify any sections as needed!
