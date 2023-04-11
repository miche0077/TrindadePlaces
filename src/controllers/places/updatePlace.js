const Place = require("../../models/place");

async function updatePlace(request, response) {
  const updateId = request.params.id;
  const updatedPlace = {
    name: request.body.name,
    contact: request.body.contact,
    opening_hours: request.body.opening_hours,
    description: request.body.description,
    latitude: request.body.latitude,
    longitude: request.body.longitude,
    
  };

  const placeFound = await Place.findByPk(updateId);

  if (!placeFound) {
    return response.status(404).json({
      error: `Place ID ${updateId} não encontrado.`,
    });
  } else if (
    !updatedPlace.name ||
    !updatedPlace.contact ||
    !updatedPlace.opening_hours ||
    !updatedPlace.description ||
    !updatedPlace.latitude ||
    !updatedPlace.longitude
  ) {
    return response.status(400).json({ error: "Todos os campos são obrigatorios." });
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
  response.status(200).json(placeFound);
}

module.exports = updatePlace;