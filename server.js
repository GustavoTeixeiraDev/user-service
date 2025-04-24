const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userProfileRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🟢 MongoDB conectado (user-service)');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 User Service rodando na porta ${process.env.PORT}`);
  });
}).catch(err => {
  console.error('🔴 Erro ao conectar ao MongoDB:', err.message);
});
