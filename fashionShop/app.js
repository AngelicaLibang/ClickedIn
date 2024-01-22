const ex = require("express");
const ps = require("./shop");
const cors = require("cors");

const app = ex();
const shopData = ps.shop;

app.use(ex.json());
app.use(cors());

// api
app.get("/api/shop/", (req, res) => {
  res.send(shopData);
});

app.get("/api/shop/:id", (req, res) => {
  const itemId = Number(req.params.id);

  for (let i = 0; i < shopData.length; i++) {
    const category = shopData[i];
    const item = category.items.find((item) =>
      item.classification.some((c) => c.id === itemId)
    );

    if (item) {
      res.send(item);
      console.log(item);
      return;
    }
  }

  let err = "Item not found!";
  res.status(404);
  res.send(err);
  console.error(err);
});

app.get("/api/shop/items/:category/:type/:classification", (req, res) => {
  const { category, type, classification } = req.params;

  for (let i = 0; i < shopData.length; i++) {
    const categoryObj = shopData[i];

    if (categoryObj.category.toLowerCase() === category.toLowerCase()) {
      for (let j = 0; j < categoryObj.items.length; j++) {
        const item = categoryObj.items[j];

        if (item.type.toLowerCase() === type.toLowerCase()) {
          const matchingClassifications = item.classification.filter(
            (c) =>
              c.classification.toLowerCase() === classification.toLowerCase()
          );

          if (matchingClassifications.length > 0) {
            res.send(matchingClassifications);
            console.log(matchingClassifications);
            return;
          }
        }
      }
    }
  }

  let err = "Item not found!";
  res.status(404);
  res.send(err);
  console.error(err);
});

//Server Setup
let port = process.emv.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});