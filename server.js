import express from 'express';
import router from './routes/index';

// Set the port from environment variables or default to 5000
const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();

// Use JSON middleware
app.use(express.json());

// Use the router for the root path
app.use('/', router);

// Start the server and log the port it's running on
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;
