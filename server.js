import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Enable CORS for all requests so our local Vite frontend can talk to this proxy
app.use(cors());

// The proxy endpoint interceptor
app.use('/proxy', (req, res, next) => {
  const target = req.query.target;
  
  if (!target) {
    return res.status(400).send('Target URL query parameter is required');
  }

  // Create the proxy middleware dynamically based on the target
  createProxyMiddleware({
    target: target.toString(),
    changeOrigin: true, // Changes the origin of the host header to the target URL
    secure: false, // Disables SSL verification (useful for self-signed or internal enterprise certs)
    pathRewrite: {
      '^/proxy': '', // Remove the /proxy prefix before forwarding
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        // Log outgoing requests for debugging
        console.log(`[Proxy] Routing request to: ${target}${req.url}`);
      }
    }
  })(req, res, next);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Local Developer CORS Proxy Server running on http://localhost:${PORT}`);
  console.log(`Routing AAP/OpenShift API requests to bypass browser restrictions.\n`);
});