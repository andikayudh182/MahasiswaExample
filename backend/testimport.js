const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("TestDataMHS.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "postgres",
      password: "andika2000",
      port: 5432
    });

    const query =
      `INSERT INTO "Mahasiswas" (nim, name, gender, department, phone, email) VALUES (NULLIF('', $1), NULLIF('', $2), NULLIF($3, 'ini kosong ges'), NULLIF($4,20), NULLIF($5, ''),NULLIF($6, NULL))`;

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);