import "reflect-metadata";
import { Template } from "../entity/Template";
import connectionPool from "../configuration/data-source";
import { Like } from "typeorm";
import CustomError from "../exception/custom-error";

export const get = async (req: any, res: any) => {
  const size = req.query?.size ? req.query.size : 10;
  const pageNo = req.query?.page ? req.query.page : 0;
  const templateRepository = connectionPool.getRepository(Template);
  let title = "";
  let sortOrder = "ASC";
  let sortBy = "title";
  if (req.query?.sortBy) {
    const sortArray = req.query.sortBy.split(" ");
    sortBy = sortArray[0];
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

    sortOrder = sortArray.length > 1 ? sortArray[1] : "asc";
    const sortOrderOptions = ["asc", "desc"];
    if (!sortOrderOptions.includes(sortOrder?.toLowerCase())) {
      throw new CustomError("INVALID_SORT_ORDER");
    }
    if (req.query?.searchTitle?.trim()) {
      title = req.query.searchTitle.trim();
    }
  }

  const [allTemplates, count] = await templateRepository.findAndCount({
    where: { title: Like("%" + title + "%") },
    order: { [sortBy]: sortOrder },
    skip: pageNo * size,
    take: size,
  });

  const data = {
    data: allTemplates,
    total: count,
  };

  res.status(200).send(data);
  return data;
};

export const post = (req: any, res: any) => {
  const templateRepository = connectionPool.getRepository(Template);
  const { title, cost, description, thumbnail, image } = req.body;
  const template = templateRepository.create({
    title: title,
    cost: cost,
    description: description,
    thumbnail: thumbnail,
    image: image,
  });
  templateRepository.save(template);
  req.query.page = 0;
  req.query.size = 4;
  return get(req, res);
};
