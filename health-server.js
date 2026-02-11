const http = require('http' );

const PORT = process.env.PORT || 3000;

// Simple HTTP server for Railway health checks
const server = http.createServer((req, res ) => {
  const timestamp = new Date().toISOString();
  
  // Respond to all requests with 200 OK
  res.writeHead(200, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  
  res.end(JSON.stringify({ 
    status: 'healthy', 
    service: 'openclaw-compiler',
    mode: 'paper-trading',
    timestamp: timestamp,
    message: 'Openclaw gateway is running. Connect via WebSocket or Railway CLI.'
  }));
  
  console.log(`[${timestamp}] Health check request from ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Health check server listening on http://0.0.0.0:${PORT}` );
  console.log(`🦞 Railway can now verify this service is healthy`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down health server...');
  server.close(() => {
    console.log('Health server closed');
    process.exit(0);
  });
});
