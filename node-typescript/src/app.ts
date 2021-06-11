import express from 'express';
// import bodyParser from 'body-parser';

import todosRoutes from './routes/todos';

const app = express();

// app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded());

app.use(todosRoutes);

app.listen(5000 , () => {
    console.log('Server listening on port 5000');
});
