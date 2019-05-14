import express from 'express'
import expressWs from 'express-ws'
import bodyParser from 'body-parser'
import cors from 'cors'
import './util/db-config'
import * as Middleware from './util/middleware'
import UserRouter from './user'
import GroupRouter from './group'
import TabRouter from './tab'
import AuthRouter from './auth'
import TabEditWebSocket from './tab-edit';
// import https from 'https'
// import fs from 'fs'


const app = express();
let ws = expressWs(app);

app.use(cors());

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

process.env.JWT_SECRET = 'yarmolik'

app.use('*', Middleware.parseJWT);

//routers registration
app.use('/user', UserRouter);
app.use('/group', GroupRouter);
app.use('/tab', TabRouter);
app.use('/auth', AuthRouter);

app.ws('/edit.tab', TabEditWebSocket);

let port = 1234;
// https.createServer({ key: fs.readFileSync('server.key'), cert: fs.readFileSync('server.cert')}, app)
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});