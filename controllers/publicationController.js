const { validationResult } = require("express-validator");
const Publication = require("../model/Publication");

exports.createPublication = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({
      route: "publication/create",
      status: 400,
      message: "Erro na validação.",
      errors: errors.array()
    })
  };

  const { title, content, author } = req.body;

  const publication = {
    title,
    content,
    author
  };

  try {
    await Publication.create(publication);
    res.status(201).json({ message: "Publicação cadastrada com sucesso!" });
  } catch (error) {
    next(error);
  };

};