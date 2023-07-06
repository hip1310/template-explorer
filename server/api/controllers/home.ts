import "reflect-metadata";
import { Template } from "../entity/Template";
import connectionPool from "../data-source";
import { Like } from "typeorm";
import CustomError from "../exception/CustomError";
import {
  ID_NOT_FOUND,
  INVALID_SORT_COLUMN,
  INVALID_SORT_ORDER,
  TITLE_ALREADY_EXIST,
} from "../util/constants";

export const get = async (req: any, res: any, next: any) => {
  const size = req.query?.size ? req.query.size : 10;
  const pageNo = req.query?.page ? req.query.page : 0;
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
      try {
        throw new CustomError(INVALID_SORT_COLUMN);
      } catch (error) {
        next(error);
      }
    }

    sortOrder = sortArray.length > 1 ? sortArray[1] : "asc";
    const sortOrderOptions = ["asc", "desc"];
    if (!sortOrderOptions.includes(sortOrder?.toLowerCase())) {
      try {
        throw new CustomError(INVALID_SORT_ORDER);
      } catch (error) {
        next(error);
      }
    }
    if (req.query?.searchTitle?.trim()) {
      title = req.query.searchTitle.trim();
    }
  }
  const templateRepository = connectionPool.getRepository(Template);
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

export const getById = async (req: any, res: any, next: any) => {
  const templateRepository = connectionPool.getRepository(Template);
  const id = req.params?.id;

  if (!id) {
    try {
      throw new CustomError(ID_NOT_FOUND);
    } catch (error) {
      next(error);
    }
  }

  const data = await templateRepository.findOne({
    where: { id: id },
  });

  res.status(200).send(data);
  return data;
};

export const post = async (req: any, res: any, next: any) => {
  const templateRepository = connectionPool.getRepository(Template);
  const { title, cost, description, thumbnail, image } = req.body;
  const existingTemplate = await templateRepository.find({
    where: { title: title },
  });
  if (existingTemplate.length >= 1) {
    try {
      throw new CustomError(TITLE_ALREADY_EXIST);
    } catch (error) {
      next(error);
    }
  } else {
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
    return get(req, res, next);
  }
};

export const put = async (req: any, res: any, next: any) => {
  const templateRepository = connectionPool.getRepository(Template);
  const { id, title, cost, description, thumbnail, image } = req.body;
  const existingTemplate = await templateRepository.find({
    where: { title: title },
  });
  if (existingTemplate.length >= 1 && existingTemplate[0].id != id) {
    try {
      throw new CustomError(TITLE_ALREADY_EXIST);
    } catch (error) {
      next(error);
    }
  }else{
    templateRepository.update(
      {
        id: id,
      },
      {
        title: title,
        cost: cost,
        description: description,
        thumbnail: thumbnail,
        image: image,
      }
    );
    req.query.page = 0;
    req.query.size = 4;
    return get(req, res, next);
  }
};

export const deleteTemplate = async (req: any, res: any, next: any) => {
  const templateRepository = connectionPool.getRepository(Template);
  const id = req.params?.id;

  if (!id) {
    try {
      throw new CustomError(ID_NOT_FOUND);
    } catch (error) {
      next(error);
    }
  }

  await templateRepository.delete({
    id: id,
  });
  req.query.page = 0;
  req.query.size = 4;
  return get(req, res, next);
};
