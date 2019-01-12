import * as express from 'express';
import api from './api';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api', api);

const port = 5000;
app.listen(port, () => console.log(`The server run on a port ${port}.`));
