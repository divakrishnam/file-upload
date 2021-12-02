require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const connectDB = require('./db/connect');

const productRouter = require('./routes/productRoutes');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
