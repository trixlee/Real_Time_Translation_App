const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        // Ensure the uploads folder exists, create it if not
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Generate unique filename
    }
});

const upload = multer({ storage: storage });

// Route to handle file uploads and start transcription process
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const filePath = file?.path;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    console.log('Processing uploaded file:', file.originalname);

    // Start the transcription process using Whisper
    const transcriptionProcess = exec(`whisper "${filePath}" --language fr --output_dir "${path.dirname(filePath)}"`);

    // Set a timeout to handle hanging processes
    const timeout = setTimeout(() => {
        transcriptionProcess.kill(); // Kill the process if it takes too long
        res.status(500).json({ message: 'Transcription process timed out.' });
    }, 2 * 60 * 1000); // 2 minutes timeout

    transcriptionProcess.on('close', async (code) => {
        clearTimeout(timeout); // Clear timeout once process ends
        console.log(`Transcription process exited with code ${code}`);
        
        if (code !== 0) {
            return res.status(500).json({ message: 'Error in transcription process.' });
        }

        // Whisper generates a file with the same base name but with `.txt` extension
        const transcriptionFile = filePath.replace(path.extname(filePath), '.txt');

        try {
            // Read the transcribed text from the generated .txt file
            const transcribedText = fs.readFileSync(transcriptionFile, 'utf8');

            // Get the target language from form data (default to French if not provided)
            const targetLanguage = req.body.language || 'fr';

            // Translate the transcribed text
            const translatedText = await translateText(transcribedText, targetLanguage);
            
            // Send response with translated text
            res.json({ message: 'Transcription and translation completed', translatedText });
        } catch (error) {
            console.error('Error reading transcription file:', error.message);
            res.status(500).json({ message: 'Failed to read transcription file.' });
        }
    });

    transcriptionProcess.on('error', (error) => {
        clearTimeout(timeout);
        console.error('Error in transcription process:', error);
        res.status(500).json({ message: 'Error in transcription process.' });
    });
});

// Function to translate text using LibreTranslate API
async function translateText(text, targetLanguage) {
    try {
        const response = await axios.post('https://libretranslate.com/translate', {
            q: text,
            target: targetLanguage,
            source: 'auto'  // Auto-detect source language
        });
        return response.data.translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        throw new Error('Translation failed');
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
