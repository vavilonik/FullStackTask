const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { port } = require("./config");
require("./database");
const app = express();

const Employee = require("./database/model/Employee");
const validator = require("./helpers/validator");
const validateEmployeeSchema = require("./helpers/validateEmployeeSchema");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

app.get("/", async (req, res) => {
	try {
		const employees = await Employee.find().lean();
		return res.json(employees);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Server error");
	}
});

app.post("/", validator(validateEmployeeSchema), async (req, res) => {
	const emp = new Employee({
		...req.body,
	});

	try {
		const saveEmp = await emp.save();
		return res.json(saveEmp);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Server error");
	}
});

app.put("/:id", validator(validateEmployeeSchema), async (req, res) => {
	try {

    const { id } = req.params;

    let doc = await Employee.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      {
        new: true,
      }
    );

    return res.json(doc);
    
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Server error");
	}
});

app.delete("/:ids", async (req, res) => {
	try {
		const { ids } = req.params;
		const idsArray = ids.split(",").map(mongoose.Types.ObjectId);
		const result = await Employee.deleteMany({ _id: { $in: idsArray } });
		return res.json(result);
	} catch (error) {
		console.error(err.message);
		return res.status(500).send("Server error");
	}
});

app.listen(port, () => {
	console.log(`server running on port : ${port}`);
});
