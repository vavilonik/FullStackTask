const DB_CONFIG = {
  user: "",
  password: "",
  host: "localhost",
  port: "27017",
  name: "FullStackTask"
}

const port = 3001;

module.exports = {
  port,
  db: DB_CONFIG
}