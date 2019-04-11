import express from 'express'

const app = express();

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});