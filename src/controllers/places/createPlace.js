const Place = require("../../models/place");

async function createPlace(request, response) {
  try {
    const data = {
      name: request.body.name,
      contact: request.body.contact,
      opening_hours: request.body.opening_hours,
      description: request.body.description,
      latitude: request.body.latitude,
      longitude: request.body.longitude
    };
    const placeInDataBase = await Place.findOne({
      where: { name: data.name, contact: data.contact },
    });
    if (placeInDataBase) {
      return response.status(400).json({ message: "Place existe" });
    }
    const place = await Place.create(data);

    response.status(201).json(place);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Não foi possivel concluir a operação" });
  }
}

module.exports = createPlace