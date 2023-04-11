require("dotenv").config();
const express = require("express");

const connection = require("./src/database/db");


const validateToken = require("./src/middleware/validatetoken");
const validateNewUser = require("./src/middleware/validateUser");



const createPlace = require("./src/controllers/places/createPlace");
const findPlace = require("./src/controllers/places/findPlace");
const deletePlace = require("./src/controllers/places/deletePlace");
const updatePlace = require("./src/controllers/places/updatePlace");

const createUser = require("./src/controllers/users/createUser");
const createLogin = require("./src/controllers/users/createSession");

const app = express();
app.use(express.json());

connection.authenticate();
connection.sync({ alter: true });

//[M1S09] Ex 3 - Rota POST
app.post("/places", validateToken, createPlace);

//[M1S09] Ex 4  - Rota GET
app.get("/places", validateToken, findPlace);

//[M1S09] Ex 5 - Rota DELETE
app.delete("/places/:id", validateToken, deletePlace);

//[M1S09] Ex 6 - Rota PUT
app.put("/places/:id", validateToken, updatePlace);

//[M1S10] Ex 2 - Rota POST (USER)
app.post("/users", validateNewUser, createUser);

//[M1S10] Ex 3 - Rota de sessão e jwt
app.post("/sessions/:username/:password", createLogin);

app.listen(3333, () => {});
