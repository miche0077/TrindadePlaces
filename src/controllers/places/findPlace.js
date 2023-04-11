const Place = require("../../models/place");

async function findPlaces(request, response) {
  try {
    const places = await Place.findAll();
    response.json(places);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Não foi possivel concluir a operação" });
  }
}

module.exports = findPlaces;
