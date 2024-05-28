import { Router } from "express";
import * as carsController from "../../controller/carController/carController";
import CheckMongoId from "../../middleware/Validator/mustBeID";
const route = Router();
route
  .route("/")
  .post(carsController.createController)
  .get(carsController.getAllController)
  .patch(carsController.deleteSomeController);

route
  .route("/one/:id")
  .get(
    CheckMongoId.IDsRules(),
    CheckMongoId.validateInput,
    carsController.getOneController
  )
  .patch(
    CheckMongoId.IDsRules(),
    CheckMongoId.validateInput,
    carsController.updateOneController
  )
  .delete(
    CheckMongoId.IDsRules(),
    CheckMongoId.validateInput,
    carsController.deleteOneController
  );

export default route;
