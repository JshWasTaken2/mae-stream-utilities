/**
 * Example API endpoint for StreamElements custom API
 *
 * Usage in StreamElements:
 * ${customapi.https://your-vercel-app.vercel.app/api/example}
 */

module.exports = async (req, res) => {
  // Enable CORS for StreamElements
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Example: Return a simple response
    const response = {
      message: 'Hello from StreamElements API!',
      timestamp: new Date().toISOString()
    };

    // For StreamElements, you typically want to return plain text
    // If you need JSON, StreamElements can parse it
    res.status(200).send(response.message);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
};
