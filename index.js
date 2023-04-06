const express = require("express");
const connection = require("./src/database/index");
const Place = require("./src/models/place");

const app = express();

app.use(express.json());

connection.authenticate();
connection.sync({ alter: true });

//[M1S09] Ex 3 - Rota POST
app.post("/places", async (request, response) => {
  try {
    const data = {
        name: request.body.name,
        contact: request.body.contact,
        opening_hours: request.body.opening_hours,
        description: request.body.description,
        latitude: request.body.latitude,
        longitude: request.body.longitude
    };

    const place = await Place.create(data);

    response.status(201).json(place);
    
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Não possivel concluir a operação" });
  }
})
//[M1S09] Ex 4  - Rota GET
app.get('/places', async (request, response) => {
    try {
        const places = await Place.findAll()
        return response.json(places)
    } catch (error) {
        
    }
})
//[M1S09] Ex 5 - Rota DELETE
app.delete('/places/:id', async (request, response) => {
    const deleteId = request.params.id;
    const placeFound = await Place.findByPk(deleteId);
  
    if (!placeFound) {
      return response.status(404).json({
        error: `Place ID ${deleteId} was not found.`
      });
      
    }
      response.status(204).json({
        success: `Place ID ${deleteId} was deleted`
      });
      await placeFound.destroy();
  
    console.log(`${Date()} -> Place ID ${deleteId} deleted`)
  })

  //[M1S09] Ex 6 - Rota PUT
  app.put("/places/:id", async (req, res) => {
    const updateId = req.params.id;
    const updatedPlace = {
      name: req.body.name,
      contact: req.body.contact,
      opening_hours: req.body.opening_hours,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    };

    const placeFound = await Place.findByPk(updateId);

    if (!placeFound) {
      return res.status(404).json({
        error: `Place ID ${updateId} was not found.`,
      });
    } else if (
      !updatedPlace.name ||
      !updatedPlace.contact||
      !updatedPlace.opening_hours ||
      !updatedPlace.description ||
      !updatedPlace.latitude ||
      !updatedPlace.longitude
    ) {
      return res.status(400).json({ error: "All fields are mandatory." });
    }

    placeFound.set({
      name: updatedPlace.name,
      contact: updatedPlace.contact,
      opening_hours: updatedPlace.opening_hours,
      description: updatedPlace.description,
      latitude: updatedPlace.latitude,
      longitude: updatedPlace.longitude,
    });

    await placeFound.save();
    res.status(200).json(placeFound);

    console.log(`${Date()} -> Place ID ${updateId} updated`);
  });
  app.listen(3333, () => {});
