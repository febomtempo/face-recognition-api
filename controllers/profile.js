const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.lenght) {
        res.json(user[0]);
      } else {
        res.status(400).json("Não encontrado");
      }
    })
    .catch((err) => res.status(400).json("Erro ao encontrar usuário"));
};

module.exports = {
  handleProfileGet,
};
