module.exports = (req, res, next) => {
  req.habitID = req.params.id;
  next();
};