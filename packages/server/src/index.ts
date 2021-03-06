import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import api from "./api";

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.use(cors());
app.use(bodyParser.json());
app.use("/api", api);

const port = 5000;
// tslint:disable-next-line
app.listen(port, () => console.log(`The server run on a port ${port}.`));
