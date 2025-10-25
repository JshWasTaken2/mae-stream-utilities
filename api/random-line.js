/**
 * Random Line API - Retrieves a random line from a Pastebin raw link
 * Lines are separated by '#' characters
 *
 * Usage in StreamElements:
 * ${customapi.https://your-vercel-app.vercel.app/api/random-line?url=PASTEBIN_RAW_URL}
 *
 * Example:
 * ${customapi.https://your-vercel-app.vercel.app/api/random-line?url=https://pastebin.com/raw/XXXXXX}
 */

const axios = require('axios');

module.exports = async (req, res) => {
  // Enable CORS for StreamElements
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get the Pastebin URL from query parameter
    const { url } = req.query;

    if (!url) {
      return res.status(400).send('Error: Missing URL parameter. Usage: ?url=PASTEBIN_RAW_URL');
    }

    // Fetch the content from the Pastebin URL
    const response = await axios.get(url, {
      timeout: 5000, // 5 second timeout
      headers: {
        'User-Agent': 'MaeStreamUtilities/1.0'
      }
    });

    const content = response.data;

    if (!content || typeof content !== 'string') {
      return res.status(500).send('Error: Could not retrieve content from URL');
    }

    // Split content by '#' delimiter and filter out empty entries
    const lines = content
      .split('#')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (lines.length === 0) {
      return res.status(404).send('Error: No lines found in the content');
    }

    // Select a random line
    const randomIndex = Math.floor(Math.random() * lines.length);
    const randomLine = lines[randomIndex];

    // Return the random line as plain text for StreamElements
    res.status(200).send(randomLine);

  } catch (error) {
    console.error('Error fetching random line:', error.message);

    // Handle specific error cases
    if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      return res.status(500).send('Error: Could not reach the URL');
    }

    if (error.response) {
      return res.status(500).send(`Error: URL returned status ${error.response.status}`);
    }

    res.status(500).send('Error: An unexpected error occurred');
  }
};
