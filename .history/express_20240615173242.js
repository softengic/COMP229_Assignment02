import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import template from './template.js';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(template);

export default app;