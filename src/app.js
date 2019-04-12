import express from 'express'
import bodyParser from 'body-parser'
import './util/db'
import * as Middleware from './util/middleware'
import UserRouter from './user'
import GroupRouter from './group'
import TabRouter from './tab'
import AuthRouter from './auth'

const app = express();

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('*', Middleware.parseJWT);

//routers registration
app.use('/user', UserRouter);
app.use('/group', GroupRouter);
app.use('/tab', TabRouter);
app.use('/auth', AuthRouter);

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});