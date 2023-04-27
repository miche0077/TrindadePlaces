const Place = require("../../models/place");

async function deletePlace(request, response) {
  const deleteId = request.params.id;
  const placeFound = await Place.findByPk(deleteId);
  try {
    await placeFound.destroy();
    response.status(204).json();
  } catch {
    response.status(500).json({ message: "Error" });
  }
}

module.exports = deletePlace;
