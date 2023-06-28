const allThumbnails = require("../data/templates.json");
const CustomError = require("../exception/custom-error");
exports.get = (req, res) => {
  const size = req.query?.size ? req.query.size : 10;
  const pageNo = req.query?.page ? req.query.page : 0;
  let thumbnails = Object.assign([], allThumbnails);
  let total = allThumbnails.length;
  if (req.query?.sortBy) {
    const sortArray = req.query.sortBy.split(" ");
    const sortBy = sortArray[0];
    const sortByOptions = [
      "title",
      "cost",
      "id",
      "description",
      "thumbnail",
      "image",
    ];
    if (!sortByOptions.includes(sortBy?.toLowerCase())) {
      throw new CustomError("INVALID_SORT_COLUMN");
    }
    const sortOrder = sortArray.length > 1 ? sortArray[1] : "asc";
    const sortOrderOptions = ["asc", "desc"];
    if (!sortOrderOptions.includes(sortOrder?.toLowerCase())) {
      throw new CustomError("INVALID_SORT_ORDER");
    }

    thumbnails.sort(function (a, b) {
      if (a[sortBy] < b[sortBy]) {
        if (sortOrder === "asc") {
          return -1;
        } else {
          return 1;
        }
      }
      if (a[sortBy] > b[sortBy]) {
        if (sortOrder === "asc") {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    });
  }

  if (req.query?.searchTitle?.trim()) {
    thumbnails = thumbnails.filter((element) =>
      element.title.includes(req.query?.searchTitle?.trim())
    );
    if (!Array.isArray(thumbnails)) {
      thumbnails = [thumbnails];
    }
    total= thumbnails.length
  }

  const data = {
    data: thumbnails.splice(pageNo * size, size),
    total: total,
  };

  res.status(200).send(data);

  return data;
};
