module.exports = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
};
