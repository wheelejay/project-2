import express from 'express';
import ViteExpress from 'vite-express';

const app = express();
ViteExpress.config({ printViteDevServerHost: true });



const port = process.env.PORT || 8080;
ViteExpress.listen(app, port, () => console.log(`Server is listening http://localhost:${port}`));
