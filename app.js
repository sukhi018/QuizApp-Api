require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const changePassword = require('./controllers/password')
const dbConnect = require('./db/connect')
const authRouter = require('./routes/auth')
const dataRouter = require('./routes/data')
const authCheck = require('./middleware/authentication')
const {getQuestions} = require('./controllers/data')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-production-app.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// routes


app.use('/api/v1/auth',authRouter)
app.post('/api/v1/changePassword',authCheck,changePassword)

router.get('/api/v1/questions',getQuestions)

app.use('/api/v1/data',authCheck,dataRouter)
app.get('/', (req, res) => {
  res.send('Welcome to quiz api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
