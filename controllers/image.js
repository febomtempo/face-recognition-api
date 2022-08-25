const Clarifai = require("clarifai");

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API,
});

let imgUrl;

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      imgUrl = req.body.input;
      res.json(data);
    })
    .catch((err) =>
      res.status(400).json("Não foi possível trabalhar com a API")
    );
};

const handleImage = (req, res, db) => {
  const { id, input } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
      db.insert({ user_id: req.body.id, link: imgUrl })
        .into("fotos")
        .then((data) => {
          console.log("sucesso");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => res.status(400).json("Não foi possível pegar as entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};

