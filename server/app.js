import express from 'express';
import ViteExpress from 'vite-express';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());
ViteExpress.config({ printViteDevServerHost: true });
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }
    res.send('Login successful!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
const port = process.env.PORT || 8080;
ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));