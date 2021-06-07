const express = require("express");
const { addImages } = require("../controller/add-images");
const { addItem } = require("../controller/add-items");
const { deleteItem } = require("../controller/delete-items");
const { getAllItems } = require("../controller/get-all-items");
const { getItem } = require("../controller/get-item");
const { updateItem } = require("../controller/update-items");

const app = express();

// router
app.post("/tambah-image", (req, res) => {
  addImages(req, res);
});
app.post("/tambah-item", (req, res) => {
  addItem(req, res);
});
app.delete("/hapus-item", (req, res) => {
  deleteItem(req, res);
});
app.get("/tampil-semua-items", (req, res) => {
  getAllItems(req, res);
});
app.get("/tampil-item", (req, res) => {
  getItem(req, res);
});
app.put("/ubah-item", (req, res) => {
  updateItem(req, res);
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

module.exports = { server };
