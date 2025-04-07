const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Data for HTTP status codes
const statusCodes = {
  200: "OK: The request has succeeded. The meaning of this status depends on the HTTP method used.",
  201: "Created: A resource has been successfully created.",
  204: "No Content: Request processed successfully, but no content is returned.",
  400: "Bad Request: The request is invalid due to client-side errors.",
  401: "Unauthorized: Authentication is required to access the resource.",
  403: "Forbidden: The server refuses to authorize the request.",
  404: "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource.",
  405: "Method Not Allowed: HTTP method not supported for this resource.",
  429: "Too Many Requests: The user has sent too many requests in a given amount of time (rate limiting).",
  500: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.",
  502: "Bad Gateway: The server received an invalid response from the upstream server.",
  503: "Service Unavailable: Server temporarily overloaded or under maintenance.",
  504: "Gateway Timeout: The server did not receive a timely response from the upstream server."
};

// ---------- HTTP Status Code API ----------
// GET /status-info?code=<status_code>
app.get('/status-info', (req, res) => {
  const code = parseInt(req.query.code, 10);
  
  if (!code || isNaN(code)) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request: Please provide a valid HTTP status code as a query parameter (?code=200)"
    });
  }

  const message = statusCodes[code];

  if (!message) {
    return res.status(404).json({
      status: 404,
      message: "Status code not supported. Please use one of the supported status codes listed in the README."
    });
  }

  res.json({
    status: code,
    message: message
  });
});

// ---------- Virtual Assistant API ----------
// GET /assistant/greet?name=<user_name>
app.get('/assistant/greet', (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request: Please provide your name using the query parameter (?name=Alex)"
    });
  }

  res.json({
    status: 200,
    message: `Hello, ${name}! How can I assist you today?`
  });
});

// ---------- Server Start ----------
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
