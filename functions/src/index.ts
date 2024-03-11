import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { createUserController } from "./controllers/userController";
import { incrementUserId } from "./services/userService";

admin.initializeApp();

const app = express();

app.use(express.json());

app.post("/create-user", createUserController);

export const addIncrementId = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snapshot, context) => {
    const userId = context.params.userId;
    await incrementUserId(userId);
    return null;
  });

export const users = functions.https.onRequest(app);
