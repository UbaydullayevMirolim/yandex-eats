import express from 'express';
import {run} from './start/run';
import {modules} from './start/modules';

const app = express();

modules(app);
run(app)
