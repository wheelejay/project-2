import express from 'express';
import ViteExpress from 'vite-express';
import bcrypt from 'bcryptjs';
import { User } from './models/userModel.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import { UserWeight } from './models/userWeightModel.js';

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
//Login post request
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }
    res.send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//PATCH request to edit user data
app.patch('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  let updateOps = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    const allowedUpdates = ['fName', 'lName', 'email', 'gWeight', 'password'];
    const isValidOperation = Object.keys(updateOps).every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    if (updateOps.gWeight) {
      updateOps['gWeightTimestamp'] = new Date().toISOString();
    }
    
    if (updateOps.password) {
      const hashedPassword = await bcrypt.hash(updateOps.password, 8);
      updateOps.password = hashedPassword;
    }
    Object.keys(updateOps).forEach((key) => {
      user[key] = updateOps[key];
    });
    await user.save();
    res.send({ user, message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//DELETE request to delete user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    await user.destroy();
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/user_weights/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const deleteUserWeights = await UserWeight.destroy({ where: { userId } });
    if (deleteUserWeights) {
      res.send({ message: 'User weights deleted successfully' });
    } else {
      res.status(404).send({ message: 'User weights not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//DElETE request to delete last Weight entry 
app.delete('/api/user_weights/:userId/:weightId', async (req, res) => {
  const { userId, weightId } = req.params;
  try {
    const weight = await UserWeight.findOne({ where: { id: weightId, userId } });
    if (!weight) {
      return res.status(404).send({ message: 'Weight entry not found' });
    }
    await weight.destroy();
    res.send({ message: 'Weight entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

ViteExpress.config({ printViteDevServerHost: true });
const port = process.env.PORT || 8080;
ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));