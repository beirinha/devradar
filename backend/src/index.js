const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('../src/websocket');

const app = express();
app.use(express.json());

const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://<usuario>:<senha>@cluster0-3wvmv.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);