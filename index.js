import express from "express";
import fs from "fs";
// Initialization of app
const app = express();
app.use(express.json());
let data = [
  { id: 1, name: "Dhoni", age: 40 },
  { id: 2, name: "Kohli", age: 30 },
  { id: 3, name: "Raina", age: 35 },
];

// CRUD _> Create , Read, Update, Delete
// 1. Create (POST route) OR PUT route

app.post("/create", (req, res) => {
  const { name, age } = req.query;
  console.log({ name, age });
  const newUser = { name, age };
  // Database Operations
  // INSERT
  data.push({ ...newUser });
  const result = fs.writeFileSync("./data/sample.json", JSON.stringify(data));

  res.send(JSON.stringify(data));
});

// 2. Read
app.get("/get", validate, (req, res) => {
  // Database operations
  // SELECT
  res.send(JSON.stringify(data));
});
// 3. Update PUT route
app.put("/update/:uniqId", (req, res) => {
  const { uniqId } = req.params;
  const { name, age } = req.query;

  //   Database operations
  const changeObj = data.filter((d) => d.id != parseInt(uniqId));
  data = [...changeObj, { id: parseInt(uniqId), name, age: parseInt(age) }];
  console.log({ data });
  //   UPDATE statement

  res.send("SUCCESSFULL");
});
// 4. Delete
app.delete("/delete/:uniqId", (req, res) => {
  const { uniqId } = req.params;
  const changeObj = data.filter((d) => d.id != parseInt(uniqId));
  data = [...changeObj];
  console.log({ data });
  res.send("DELETED");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

function validate(req, res, next) {
  console.log("VALIDATINGGGGG");
  const { name } = req.query;
  if (name === "Tejas") next();
}
