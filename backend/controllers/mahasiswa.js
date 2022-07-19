const Mahasiswa = require('../models').Mahasiswa;
const Department = require('../models').Department;
const db = require('../db/index')
const Joi = require('joi');

// const { body, validationResult } = require('express-validator');

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

   async add(req,res) {
    // cara 1
    //   await db.query(`SELECT * FROM "Departments" WHERE id = ${req.body.department}`, []).then((results) => {

    //     if(results.rows.length>0){
    //       console.log( results[0] + " gas ")

    //     } else {
    //       res.status(400).send({ message :'data department tidak ditemukan'})
    //     }
  
    
    // }).catch(function(err){
    
    //     console.log("Error:" + String(err));
    
    // });

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
          nim: Joi.string().pattern(new RegExp("[0-9]{2}-[0-9]{7}")).required(),
          name: Joi.string() .min(6) .required(),
          email: Joi.string().email({ tlds: { allow: false } }) .required(),
          gender: Joi.string().valid('1','2').required(),
          department:Joi.number().valid().required(),
          phone: Joi.string().min(10).max(10).required()

         });
        
        const validation = schema.validate(req.body);
        console.log(validation)

        if (validation.error){
          res.status(400).send(validation.error.details)
        }
         
        const mahasiswa = req.body;
       
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
  const schema = Joi.object({ 
    nim: Joi.string().pattern(new RegExp("[0-9]{2}-[0-9]{7}")).required(),
    name: Joi.string() .min(6) .required(),
    email: Joi.string().email({ tlds: { allow: false } }) .required(),
    gender: Joi.string('1','2').valid('').required(),
    department:Joi.number().valid().required(),
    phone: Joi.string().min(10).max(10).required()

   });
  
  const validation = schema.validate(req.body);
  console.log(validation)

  if (validation.error){
    res.status(400).send(validation.error.details)
  }
   

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

async importCsvFile(req, res){
  let mahasiswa = req.body.dir
  let resultmahasiswa = mahasiswa.replace(/\"|\"/gi,'')
  const querySQL = 
  `copy public."Mahasiswas" (nim, name, gender, department, phone, email) FROM 
  '${resultmahasiswa}' DELIMITER ',' 
  CSV HEADER ENCODING 'UTF8' `
  // const paramsSQL = [
  //   mahasiswa.dir
  // ]
  const result = (await db.query(querySQL))

      // res.setHeader('Content-Type', 'application/csv');
      res.status(200).send({
      message:`import data csv berhasil`,
      data :result
    })

  
}
};