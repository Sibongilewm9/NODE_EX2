const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

let employees = [
  { id: 1, name: "Sipho Dlamini", role: "Cashier" },
  { id: 2, name: "Nomsa Khumalo", role: "Stocker" },
];

let managers = [
  { id: 1, name: "Johan Botha", department: "Floor" },
  { id: 2, name: "Zanele Mthembu", department: "HR" },
];

// ===== EMPLOYEES ROUTES =====
app.get("/employees", (req, res) => {
  res.json({ message: "GET all employees", data: employees });
});

app.post("/employees", (req, res) => {
  const newEmployee = { id: employees.length + 1, ...req.body };
  employees.push(newEmployee);
  res
    .status(201)
    .json({ message: "POST: Employee added successfully", data: newEmployee });
});

app.patch("/employees/:id", (req, res) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id));
  if (employee) {
    Object.assign(employee, req.body);
    res.json({ message: "PATCH: Employee partially updated", data: employee });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

app.delete("/employees/:id", (req, res) => {
  employees = employees.filter((e) => e.id !== parseInt(req.params.id));
  res.json({ message: `DELETE: Employee with id ${req.params.id} deleted` });
});

// ===== MANAGERS ROUTES =====
app.get("/managers", (req, res) => {
  res.json({ message: "GET all managers", data: managers });
});

app.post("/managers", (req, res) => {
  const newManager = { id: managers.length + 1, ...req.body };
  managers.push(newManager);
  res
    .status(201)
    .json({ message: "POST: Manager added successfully", data: newManager });
});

app.patch("/managers/:id", (req, res) => {
  const manager = managers.find((m) => m.id === parseInt(req.params.id));
  if (manager) {
    Object.assign(manager, req.body);
    res.json({ message: "PATCH: Manager partially updated", data: manager });
  } else {
    res.status(404).json({ message: "Manager not found" });
  }
});

app.delete("/managers/:id", (req, res) => {
  managers = managers.filter((m) => m.id !== parseInt(req.params.id));
  res.json({ message: `DELETE: Manager with id ${req.params.id} deleted` });
});

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to PICK 'n STEAL API. Try /employees or /managers",
  });
});

app.listen(PORT, () => {
  console.log(`PICK 'n STEAL API running on http://localhost:${PORT}`);
});
