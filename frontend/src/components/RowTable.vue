<template>
    <tr>
        <td>
            <div class="data">{{ mhsid }}</div>
        </td>
            <td>
                <div class="data" >{{ nim }}</div>
                <div v-for='(data, index) in validateNewNIM' :key="index" class="message"> {{ data }}</div>
                <div class="message"  > {{ validation.firstError('duplikatNim') }}</div>
            </td>
            <td>
                <div class="data">{{ name }}</div>
                <div v-for='(data, index) in validateNewName' :key="index" class="message"> {{ data }}</div>
             
            </td>
            <td>
                <div class="data">{{ gender }}</div>
                <div class="message" >{{ validation.firstError('genderNew') }}</div>
            </td>
            <td>
                 <div class="data">{{ department_name }}</div>
                <div class="message" >{{ validation.firstError('departmentNew') }}</div>
                
            </td>
            <td> 
                <div class="data">{{ phone }}</div>
                <div class="message" >{{ validation.firstError('phoneNew') }}</div>
                <div v-for='(data, index) in validateNewPhone' :key="index" class="message"> {{ data }}</div>
            </td>
            <td>
                 <div class="data">{{ email }}</div>
                <div class="message" >{{ validation.firstError('emailNew') }}</div>
            </td>
            <td>
                 <router-link style="text-decoration:none;" :to="`/mahasiswa/edit/${mhsid}/`">
                            <v-icon                
                                class="mr-2"
                            >
                                mdi-pencil
                            </v-icon>
                        </router-link>
                       <v-icon     
                                class="mr-2"
                                @click.stop="dialog=true"
                                
                            >
                                mdi-delete
                            </v-icon>

                        <v-dialog
                        v-model="dialog"
                        max-width="290"
                        >
                        <v-card>
                            <v-card-text> Apakah anda mau menghapus data dengan ID {{ mhsid }}</v-card-text>
                            <v-card-action>
                                <v-btn
                                @click.stop="deleteItem(mhsid)"
                                text>
                                    Agree
                                </v-btn>
                                  <v-btn
                                  @click.stop="dialog=false"
                                  text
                                  >
                                    Disagree
                                </v-btn>
                            </v-card-action>
                        </v-card>
                        </v-dialog>
                        

            </td>
    </tr>
    
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';
Vue.use(SimpleVueValidation);


const validatorNew = SimpleVueValidation.Validator
    export default {
        data() {
            return {
                departmentNew:'',
                genderNew:'',
                duplikatNim:'',
                phoneNew:'',
                emailNew:'',
                dialog:false

                

            }
        },
        props: ['mhsid','nim','name','gender','department_name','phone','email'],

        watch:{
          
            department_name:{
                handler(new_val,old_val){
                    this.departmentNew = new_val
                    console.log(new_val + " new Val ")
                    console.log(old_val + " old  Val ")
                },
                immediate :true              
            },
            gender:{
                handler(new_val,old_val){
                    this.genderNew = new_val
                    console.log(new_val + " new Val ")
                    console.log(old_val + " old  Val ")
                },
                immediate :true              
            },
            nim:{
                handler(new_val,old_val){
                    this.duplikatNim = new_val
                    console.log(new_val + " new Val ")
                    console.log(old_val + " old  Val ")
                },
                immediate :true              
            },
             phone:{
                handler(new_val,old_val){
                    this.phoneNew = new_val
                    console.log(new_val + " new Val ")
                    console.log(old_val + " old  Val ")
                },
                immediate :true              
            },
              email:{
                handler(new_val,old_val){
                    this.emailNew = new_val
                    console.log(new_val + " new Val ")
                    console.log(old_val + " old  Val ")
                },
                immediate :true              
            },

        },
       
            methods: {
                deleteItem(idMhs){
                    axios
                .delete(`http://localhost:3000/api/mahasiswa/${idMhs}`)
                .then(response => {
                            
                   
                    console.log(response.data)
                    
                window.location.reload();
                })
                .catch(error => console.log(error))

                }

                
                // validateNIM() {
                //     var nim = this.$refs.myNIM.innerText
                   
                //      axios
                //         .get(`http://localhost:3000/api/mahasiswa/${nim}`)
                //         .then(response => {
                //            var nimAxios = parseInt(response.data.jumlah)

                //            if(nimAxios>1){
                //             this.$refs.myNIM.innerHTML += "<br><p style='color: red'>duplikat </p>" ;
                //            }
                           

                          
                //         })
                //         .catch(error => console.log(error))

                  
        
                //     if (nim.length > 0){
                //         if (nim.match("^[0-9]{2}-[0-9]{7}$")){
                //             console.log(nim)
                //         } else {
                //             console.log("gagal maning")
                //             this.$refs.myNIM.innerHTML = nim.concat("<br><p style='color: red'>2angka-7angka</p>");
                //         }
                        
                //     } else {
                //         this.$refs.myNIM.innerHTML = nim.concat("<br><p style='color: red'>NIM tidak boleh kosong</p>");
                //     }
                // },

                // validateName(){
                //      var name = this.$refs.myName.innerText

                //      if (name.length>0){
                //         if (name.length < 6){
                //              console.log("nama pendek")
                //             this.$refs.myName.innerHTML = name.concat("<br><p style='color: red'>Minimal 6 karakter </p>");
          
                //         } else {
                //             console.log("aman")
                          
                //         }
                      
                //      } else {
                //         this.$refs.myName.innerHTML = name.concat("<br><p style='color: red'>Nama tidak boleh kosong</p>");
                //      }

                // },

                //   validateGender(){
                //      var gender = this.$refs.myGender.innerText

                //      if (gender.length>0){
                //         if(gender.match("Male")|| gender.match("Female")){
                //             console.log("gender aman")
                //         } else {
                //             this.$refs.myGender.innerHTML = gender.concat("<br><p style='color: red'>Male or Female</p>");
                //         }
                      
                //      } else {
                //         this.$refs.myGender.innerHTML = gender.concat("<br><p style='color: red'>Gender tidak boleh kosong</p>");
                //      }

                // },

                // validateDepartment(){
                //      var department = this.$refs.myDepartment.innerText

                //      if (department.length>0){
                //        console.log("department aman")
                    
                //      } else {
                //         this.$refs.myDepartment.innerHTML = department.concat("<br><p style='color: red'>Department tidak boleh kosong</p>");
                //      }

                // },

                //  validatePhone(){
                //      var phone = this.$refs.myPhone.innerText

                //      if (phone.length>0){
                //        if (phone.match("^[0-9]{3}[ ][0-9]{3}[ ][0-9]{4}$")){
                //             console.log(phone + "phone aman")
                //         } else {
                //             console.log("gagal maning")
                //             this.$refs.myPhone.innerHTML = phone.concat("<br><p style='color: red'>3spasi3spasi4angka</p>");
                //         }
                        
                    
                //      } else {
                //         this.$refs.myPhone.innerHTML = phone.concat("<br><p style='color: red'>Phone tidak boleh kosong</p>");
                //       }

                // },

                // validateEmail(){
                //      var email = this.$refs.myEmail.innerText
                //     const regexExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

                //      if (email.length>0){
                //         if(regexExp.test(email)==true){
                //             console.log("email amann")
                //         } else {
                //             this.$refs.myEmail.innerHTML = email.concat("<br><p style='color: red'>Bukan email</p>");
                //         }
                        
                    
                //      } else {
                //         this.$refs.myEmail.innerHTML = email.concat("<br><p style='color: red'>Email tidak boleh kosong</p>");
                //       }

                // },

            },
            
            mounted() {
                this.$validate()
                
                // this.validateEmail()
        
                    
            },

            validators: {
        
               departmentNew: function (value) {

                return validatorNew.value(value).required();
            },
            
                genderNew: function (value) {

                return validatorNew.value(value).required().custom(function(){
                    console.log("ini valunya "+value)
                    if (value!= "Male" && value!="Female"){
                        return 'Gender must be Male or Female'
                    }
                }

                );

                
            },

                duplikatNim: function (value){
                    return validatorNew.value(value).custom(async function(){
                        var result = ''
                        await axios
                            .get(`http://localhost:3000/api/mahasiswa/${this.nim}`)
                            .then(response => {
                            var nimAxios = parseInt(response.data.jumlah)
                                console.log(nimAxios + 'ini data duplikat nya')
                                console.log(this.duplikatNim + 'ini duplikatNIM')
                            if(nimAxios>1){
                                
                                result = 'duplikat'
                            }
                            

                            
                            })
                            .catch(error => console.log(error))
                            return result    
                    }
                    .bind(this)

                    );

                },
                phoneNew: function (value) {

                     return validatorNew.value(value).required();
             
            },
                emailNew: function (value){
                    return validatorNew.value(value).required().email();
                }

         },

            computed:{
                validateNewNIM(){ 

                        var nimValidate = []
                

                    if (!this.nim?.length > 0){
                        nimValidate.push('nim tidak boleh kosong')
                    } 

                     if (!this.nim?.match("^[0-9]{2}-[0-9]{7}$")){
                            
                            nimValidate.push('2angka-7angka')
                        } 
                    return nimValidate
                },

                validateNewName(){
                    var nameValidate = []

                     if (!this.name?.length > 0){
                        nameValidate.push('nama tidak boleh kosong')
                    } 

                    if (this.name?.length < 6){
                        nameValidate.push('nama tidak boleh kurang dari 6')
                    } 


                    return nameValidate
                    

                },
                validateNewPhone(){
                    var phoneValidate = []

                   
                    if (!this.phone?.match("^[0-9]{3}[ ][0-9]{3}[ ][0-9]{4}$")){
                        phoneValidate.push('3spasi3spasi4angka')
                    } 


                    return phoneValidate
                    

                }
            }
           
    }
    
   
</script>

<style>
.message{
    color:red
}
</style>