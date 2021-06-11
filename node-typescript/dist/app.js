"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bodyParser from 'body-parser';
const todos_1 = __importDefault(require("./routes/todos"));
const app = express_1.default();
// app.use(bodyParser.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(todos_1.default);
app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
