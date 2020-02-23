import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './src/routes/index';
import productsRouter from './src/routes/products';
import pantryProductsRouter from './src/routes/pantryProducts';
import { connectToMongo } from './src/infra/mongoose/MongooseConnect';
import { respondError } from './src/adapters/ErrorResponse';

function isTestEnv() {
  return process.env.NODE_ENV === 'test';
}

if (!isTestEnv()) connectToMongo();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/pantry-products', pantryProductsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const errorStatus = err.status || 500;
  respondError(res, errorStatus, err.message);
});

module.exports = app;
