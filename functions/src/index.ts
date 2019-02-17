import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
import * as express from "express";
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const firebaseApp = firebase.initializeApp(functions.config().firebase);

async function getFacts() {
  const ref = firebaseApp.database().ref("/facts/g1i9O6MCYaTNhA6qU0SZ");
  return ref.once("value").then(snap => snap.val());
}

const app = express();
// res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
app.get("/api/facts", async (req, res) => {
  const data = await getFacts();
  res.json(data);
});

app.get("**", (req, res) => {
  res.send(req.url);
});

export const api = functions.https.onRequest(app);
