const Joi = require('joi');
const db = require('../db/index')
const Department = require('../models').Department;


module.exports = {
  list(req, res) {
    return Department
      .findAll({
        attributes: { 
            exclude: ['createdAt', 'updatedAt']
           }
      })
      .then((department) => res.status(200).send(
        {
          message:`Get all department success`,
          data: department
        }))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Department
      .findAll({
        attributes: { 
          exclude: ['id', 'createdAt', 'updatedAt']
         },
         where : {
          id : req.params.id
         }
      })
      .then((department) => {
        if (Object.keys(department).length == 0) {
          return res.status(404).send({
            message: 'id department tidak ditemukan',
          });
        }
        return res.status(200).send({
          message:`Get department  by ID ${req.params.id} success`,
          data : department
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  async add(req,res) {

        const schema = Joi.object({ 
          
          department_name: Joi.string() .min(6) .required(),
         

         });
        
        const validation = schema.validate(req.body);
        console.log(validation)

        if (validation.error){
          res.status(400).send(validation.error.details)
        }
         
        const department = req.body;
       
        const querySQL =`INSERT INTO "Departments" (department_name) VALUES ($1) RETURNING *`
        const paramsSQL = [
        department.department_name
        
    
        ]
        const result = (await db.query(querySQL, paramsSQL)).rows   
        
        if(Object.keys(result).length > 0){
            res.status(200).send({
            message:`Insert  data department  berhasil`,
            data : result
          })
        } else {
            res.status(400).send({
            message : 'Insert data department tidak berhasil',
            
          })
        }
    
},



async update(req, res, next) {
  const schema = Joi.object({ 
    department_name: Joi.string() .min(6) .required(),
   });
  
  const validation = schema.validate(req.body);
  console.log(validation)

  if (validation.error){
    res.status(400).send(validation.error.details)
  }
   

      const department = req.body
      const querySQL = `UPDATE "Departments" SET department_name= $1
                        WHERE id = $2 RETURNING *`
      const paramsSQL = [
        department.department_name,
        req.params.id
      ]
      const result = (await db.query(querySQL, paramsSQL)).rows   
      
      if(Object.keys(result).length > 0){
        res.status(200).send({
        message:`update data department berhasil`,
        data: result
      })
      } else {
          res.status(400).send({
          message : 'id department tidak ditemukan',
          
        })
    } 

   
},

  
async delete(req, res) {
   
    const querySQL = `DELETE FROM "Departments" WHERE id = $1 RETURNING *`
    const paramsSQL = [req.params.id]
    const result = ( await db.query(querySQL,paramsSQL)).rows

    if(Object.keys(result).length > 0){
        res.status(200).send({
        message:`delete data berhasil`
      })
    } else {
        res.status(400).send({
        message : 'id department tidak ditemukan',
        
      })
    }

},
};