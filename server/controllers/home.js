const allThumbnails = require("../data/templates.json");
exports.get = (req, res) => {
  const size = req.query?.size ? req.query.size : 10;
  const pageNo = req.query?.page ? req.query.page : 0;
  const thumbnails = Object.assign([], allThumbnails);
  const data = {
    data: thumbnails.splice(pageNo * size, size),
    total: allThumbnails.length,
  };
  res.status(200).send(data);
  return data;
};
