import { Router } from "express";
import { validate } from "../middleware/validatioin.middleware";
import { identifySchema } from "../validations/identityValidator";
import {identityController} from "../controllers/identity.controller"

export const identityRouter = Router()

identityRouter.post('', validate(identifySchema), identityController)