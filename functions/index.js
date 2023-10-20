const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const app= express();
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
app.use(require('./routes/productsRoute'));

exports.app=functions.https.onRequest(app);
