import carModel from "../../model/carModel"

import {
  create,
  getAll,
  getOneById,
  updateOneById,
  deleteOneById,
  deleteSome,
} from "../globalController";

export const createController = create(carModel);
export const getAllController = getAll(carModel);
export const getOneController = getOneById(carModel);
export const updateOneController = updateOneById(carModel);
export const deleteOneController = deleteOneById(carModel);
export const deleteSomeController = deleteSome(carModel);
