const Mahasiswa = require('../models').Mahasiswa;
const Department = require('../models').Department;
const db = require('../db/index')
const Joi = require('joi');
var path = require('path');

// const { body, validationResult } = require('express-validator');

module.exports = {
  list(req, res) {
    return Mahasiswa
      .findAll({
        attributes: { 
          exclude: ['createdAt', 'updatedAt']
         },
      })
      .then((mahasiswa) => res.status(200).send(
        {
          message:`Get all mahasiswa success`,
          data: mahasiswa,
       
        }))
      .catch((error) => { res.status(400).send(error); });
  },
  async listJoinDepartment(req, res,next) {
   try{
    const querySQL = 
    `SELECT * FROM "Mahasiswas" as mhs
    LEFT OUTER JOIN "Departments" as dpr ON
    dpr.id = mhs.department LIMIT 10 OFFSET 0 
     `
    const result = (await db.query(querySQL)).rows

    if(Object.keys(result).length > 0){
        res.status(200).send({
        message:`Get data mahasiswa join department berhasil`,
        data : result
      })
    } else {
        res.status(400).send({
        message : 'Get data mahasiswa join department gagal',
        
      })
    }
   } catch (error){
    next(error)
   }
   

},

async listJoinDepartmentWithLimit(req, res,next) {
  try{
   const querySQL = 
   `SELECT mhs.id as mhsid,nim,name,gender,department,phone,email,dpr.department_name FROM "Mahasiswas" as mhs
   LEFT OUTER JOIN "Departments" as dpr ON
   dpr.id = mhs.department 
   ORDER BY mhsid ASC LIMIT 10 OFFSET ${req.body.limit}                            

    `
   const result = (await db.query(querySQL)).rows

   if(Object.keys(result).length > 0){
       res.status(200).send({
       message:`Get data mahasiswa join department berhasil`,
       data : result
     })
   } else {
       res.status(400).send({
       message : 'Get data mahasiswa join department gagal',
       
     })
   }
  } catch (error){
   next(error)
  }
  

},

async searchMahasiswa(req, res,next) {
  try{
   const querySQL = 
   `SELECT mhs.id as mhsid,nim,name,gender,department,phone,email,dpr.department_name  FROM "Mahasiswas" as mhs
   LEFT OUTER JOIN "Departments" as dpr ON
   dpr.id = mhs.department 
   WHERE LOWER(name)::text LIKE LOWER('%${req.query.keyword}%') OR
   nim LIKE '%${req.query.keyword}%' OR
   LOWER (gender)::text LIKE '%${req.query.keyword}%' OR
   LOWER (dpr.department_name)::text LIKE '%${req.query.keyword}%' OR
   LOWER (phone)::text LIKE '%${req.query.keyword}%' OR
   LOWER (email)::text LIKE '%${req.query.keyword}%' 

 
   ORDER BY mhsid LIMIT 10 OFFSET ${req.body.limit}
    `

   
   const result = (await db.query(querySQL)).rows

   if(Object.keys(result).length > 0){
       res.status(200).send({
       message:`Search data mahasiswa join department berhasil`,
       data : result
     })
   } else {
       res.status(400).send({
       message : 'Search data mahasiswa join department gagal',
       
     })
   }
  } catch (error){
   next(error)
  }
  

},
  getbyNIM(req, res) {
    return Mahasiswa
      .findAll({
        attributes: { 
          exclude: ['createdAt', 'updatedAt']
         },
         where : {
          nim : req.params.id
         }
      })
      .then((mhs) => {
        if (Object.keys(mhs).length == 0) {
          return res.status(200).send({
            message: 'NIM mahasiswa tidak ditemukan',
            jumlah : mhs.length
          });
        }
        return res.status(200).send({
          message:'Get mahasiswa  by NIM success',
          data : mhs,
          jumlah : mhs.length
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  getbyId(req, res) {
    return Mahasiswa
      .findAll({
        attributes: { 
          exclude: ['id','createdAt', 'updatedAt']
         },
         where : {
          id : req.params.id
         }
      })
      .then((mhs) => {
        if (Object.keys(mhs).length == 0) {
          return res.status(200).send({
            message: 'ID mahasiswa tidak ditemukan',
            jumlah : mhs.length
          });
        }
        return res.status(200).send({
          message:'Get mahasiswa  by ID success',
          data : mhs,
          jumlah : mhs.length
        });
      })
      .catch((error) => res.status(400).send(error));
  },

   async add(req,res) {
 
    const paramsSQLNIM = [
      req.body.nim
    ]
    const resultNIM = ( await db.query(`SELECT nim FROM "Mahasiswas" WHERE nim = $1 `, paramsSQLNIM)).rows

    if(Object.keys(resultNIM).length > 0){
        res.status(400).send({
        message:`nim input duplikat`,
        data :resultNIM
      })
    } else {
        console.log("nim tidak duplikat")
    }

     await Department.findAndCountAll({
      where: {
        id : req.body.department
      },
      attributes: { 
        exclude: ['createdAt', 'updatedAt']
       }
    }).then((results)=> {
          if(JSON.stringify(results.count)> 0){
          console.log(" gas ")

        } else {
          res.status(400).send({ message :'data department tidak ditemukan'})
        }
      // console.log("ini results id  " + JSON.stringify(results.count))
       
    }).catch(function(err){
    
          console.log("Error:" + String(err));
      
      });
   
        const schema = Joi.object({ 
          nim: Joi.string().pattern(new RegExp("^[0-9]{2}-[0-9]{7}$")).required(),
          name: Joi.string() .min(6) .required(),
          gender: Joi.string().valid('Male','Female').required(),
          department:Joi.number().valid().required(),
          phone: Joi.string().min(12).max(12).pattern(new RegExp("^[0-9]{3}[ ][0-9]{3}[ ][0-9]{4}$")).required(),
          email: Joi.string().email({ tlds: { allow: false } }) .required()

         });
        
        const validation = schema.validate(req.body);
        console.log(validation)

        if (validation.error){
          res.status(400).send(validation.error.details)
        }
         
        const mahasiswa = req.body;
       
        const querySQL =
        `INSERT INTO "Mahasiswas"
        (nim, name, gender, department, phone, email)
          SELECT $1, $2, $3, $4, $5, $6
          WHERE NOT EXISTS (
                           SELECT nim FROM "Mahasiswas" WHERE nim = $7
        ) RETURNING *`
        const paramsSQL = [
          mahasiswa.nim, 
          mahasiswa.name,
          mahasiswa.gender,
          mahasiswa.department,
          mahasiswa.phone,
          mahasiswa.email,
          req.body.nim
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
  
  await Department.findAndCountAll({
    where: {
      id : req.body.department
    },
    attributes: { 
      exclude: ['createdAt', 'updatedAt']
     }
  }).then((results)=> {
        if(JSON.stringify(results.count)> 0){
        console.log(" gas ")

      } else {
        res.status(400).send({ message :'data department tidak ditemukan'})
      }
    // console.log("ini results id  " + JSON.stringify(results.count))
     
  }).catch(function(err){
  
        console.log("Error:" + String(err));
    
    });
  
    const schema = Joi.object({ 
  
      nim: Joi.string().pattern(new RegExp("^[0-9]{2}-[0-9]{7}$")).required(),
      name: Joi.string() .min(6) .required(),
      gender: Joi.string().valid('Male','Female').required(),
      department:Joi.number().valid().required(),
      phone: Joi.string().min(12).max(12).pattern(new RegExp("^[0-9]{3}[ ][0-9]{3}[ ][0-9]{4}$")).required(),
      email: Joi.string().email({ tlds: { allow: false } }) .required()

     });
  
  const validation = schema.validate(req.body);
  console.log(validation)

  if (validation.error){
    res.status(400).send(validation.error.details)
  }
   

      const mahasiswa = req.body
      const querySQL = `UPDATE "Mahasiswas" SET nim=$1, name= $2, gender = $3, department = $4, email = $5, phone = $6
                        WHERE id = $7 RETURNING *`
      const paramsSQL = [
        mahasiswa.nim,
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
   
        const querySQL = `DELETE FROM "Mahasiswas" WHERE id = $1 RETURNING *`
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

async countID(req, res) {
   
    const querySQL = `SELECT COUNT(id)/10 as resultid FROM "Mahasiswas"`
  
    const result = ( await db.query(querySQL)).rows

    if(Object.keys(result).length > 0){
        res.status(200).send({
        message:`counting id berhasil`,
        data : result
      })
    } else {
        res.status(400).send({
        message : 'counting id gagal',
        
      })
    }

},
async countNIM(req, res) {
   
        const querySQL = `SELECT COUNT("nim") FROM "Mahasiswas" AS "Mahasiswa" WHERE "Mahasiswa"."nim" = $1`
        const paramsSQL = [req.params.id]
        let result = ( await db.query(querySQL,paramsSQL)).rows
        console.log(result[0].count)
        if(result[0].count > 0){
            res.status(200).send({
            message:`get  count data nim ${req.params.id} berhasil`,
            data : result
          })
        } else {
            res.status(200).send({
            message : `get  count data nim ${req.params.id} gagal`,
            data : `data kosong` + result
            
          })
        }
    

},





  

async importCsvFile(req, res){
  let mahasiswa = path.join(__dirname, '../uploads/') + req.body.dir
  
  let resultmahasiswa = mahasiswa.replace(/\"|\"/gi,'')
  console.log(resultmahasiswa)
  const querySQL = 
  `copy public."Mahasiswas" (nim, name, gender, department, phone, email) FROM 
  '${resultmahasiswa}' DELIMITER ',' 
  CSV HEADER ENCODING 'UTF8' `
  // const paramsSQL = [
  //   mahasiswa.dir
  // ]
  const result = (await db.query(querySQL))
 
    res.status(200).send({
      message:`import data csv berhasil`,
      data :result
    })
     
},

uploadFile(req,res){
  if(req.files){
    console.log(req.files)
    let file = req.files.file
    let filename = file.name
    console.log(filename)

    // var date = new Date();
    // var tahun = date.getFullYear();
    // var bulan = date.getMonth();
    // var tanggal = date.getDate();
    // var hari = date.getDay();
    // var jam = date.getHours();
    // var menit = date.getMinutes();
    // var detik = date.getSeconds();

    // switch(hari) {
    //   case 0: hari = "Minggu"; break;
    //   case 1: hari = "Senin"; break;
    //   case 2: hari = "Selasa"; break;
    //   case 3: hari = "Rabu"; break;
    //   case 4: hari = "Kamis"; break;
    //   case 5: hari = "Jumat"; break;
    //   case 6: hari = "Sabtu"; break;
    // }
    // switch(bulan) {
    //   case 0: bulan = "Januari"; break;
    //   case 1: bulan = "Februari"; break;
    //   case 2: bulan = "Maret"; break;
    //   case 3: bulan = "April"; break;
    //   case 4: bulan = "Mei"; break;
    //   case 5: bulan = "Juni"; break;
    //   case 6: bulan = "Juli"; break;
    //   case 7: bulan = "Agustus"; break;
    //   case 8: bulan = "September"; break;
    //   case 9: bulan = "Oktober"; break;
    //   case 10: bulan = "November"; break;
    //   case 11: bulan = "Desember"; break;
    // }

    // let fullTime = hari + "-" + tanggal + "-" + bulan + "-" + tahun + "-" + jam + "-"+ menit + "-" + detik
    // let fixNameFile =  fullTime + "-" + filename
    file.mv('./uploads/' + filename, function (err){
      if(err){
      res.status(400)
      
       console.log(err)
   
      } else {
        res.status(200)
        
      console.log("file uploaded " + filename)
        
      }
    })
  }
}
};