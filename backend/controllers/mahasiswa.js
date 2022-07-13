const Mahasiswa = require('../models').Mahasiswa;
const db = require('../db/index')

module.exports = {
  list(req, res) {
    return Mahasiswa
      .findAll({
        attributes: { 
          exclude: ['id', 'createdAt', 'updatedAt']
         }
      })
      .then((mahasiswa) => res.status(200).send(
        {
          message:`Get all mahasiswa success`,
          data: mahasiswa,
       
        }))
      .catch((error) => { res.status(400).send(error); });
  },

  getbyNIM(req, res) {
    return Mahasiswa
      .findAll({
        attributes: { 
          exclude: ['id', 'createdAt', 'updatedAt']
         },
         where : {
          nim : req.params.id
         }
      })
      .then((mhs) => {
        if (Object.keys(mhs).length == 0) {
          return res.status(404).send({
            message: 'NIM mahasiswa tidak ditemukan',
          });
        }
        return res.status(200).send({
          message:'Get mahasiswa  by NIM success',
          data : mhs
        });
      })
      .catch((error) => res.status(400).send(error));
  },

    async add(req, res, next) {
    
   
        const mahasiswa = req.body
        const querySQL =`INSERT INTO "Mahasiswas" (nim, name, gender, department, email, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
        const paramsSQL = [
          mahasiswa.nim, 
          mahasiswa.name,
          mahasiswa.gender,
          mahasiswa.department,
          mahasiswa.email,
          mahasiswa.phone
        ]
        const result = (await db.query(querySQL, paramsSQL)).rows   
        
        if(Object.keys(result).length > 0){
            res.status(200).send({
            message:`Insert  data mahasiswa  berhasil`,
            data : result
          })
        } else {
            res.status(400).send({
            message : 'Insert data mahasiswa tidak berhasil',
            
          })
        }
    
},


async update(req, res, next) {
    

      const mahasiswa = req.body
      const querySQL = `UPDATE "Mahasiswas" SET name= $1, gender = $2, department = $3, email = $4, phone = $5
                        WHERE nim = $6 RETURNING *`
      const paramsSQL = [
        mahasiswa.name,
        mahasiswa.gender,
        mahasiswa.department,
        mahasiswa.email,
        mahasiswa.phone,
        req.params.id
      ]
      const result = (await db.query(querySQL, paramsSQL)).rows   
      
      if(Object.keys(result).length > 0){
        res.status(200).send({
        message:`update data mahasiswa berhasil`,
        data: result
      })
      } else {
          res.status(400).send({
          message : 'nim mahasiswa tidak ditemukan',
          
        })
    } 

   
},



async delete(req, res) {
   
        const querySQL = `DELETE FROM "Mahasiswas" WHERE nim = $1 RETURNING *`
        const paramsSQL = [req.params.id]
        const result = ( await db.query(querySQL,paramsSQL)).rows

        if(Object.keys(result).length > 0){
            res.status(200).send({
            message:`delete data berhasil`
          })
        } else {
            res.status(400).send({
            message : 'nim mahasiswa tidak ditemukan',
            
          })
        }
    
  },

// async importCsvFile(req, res){
//   const mahasiswa = req.body
//   const querySQL = `COPY "Mahasiswas" (nim,name,gender,department,phone,email)
//   FROM '$1 DELIMITER ',' CSV HEADER  `
//   const paramsSQL = [
//     mahasiswa.dir
//   ]
//   const result = ( db.query(querySQL,paramsSQL))

  
//       res.status(200).send({
//       message:`import data csv berhasil`,
//       data :result
//     })

  
// }
};