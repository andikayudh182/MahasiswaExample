<template>

    <v-form v-model="valid">
        <v-container >
            <h1 class="mb-20" v-if="registration"> Registration Form Mahasiswa</h1>
            <h1 class="mb-20" v-if="edit"> Edit Form Mahasiswa</h1>
            
             

           <!-- Text Field NIM -->
            <v-row>
                <v-col cols="5"> 
                    <v-text-field
                        v-model="editedItemMahasiswa.nim"
                        label="NIM"
                        :rules="nimRules"
                
                    ></v-text-field>
                </v-col>
            </v-row>

               <div class="message" >{{ validation.firstError('editedItemMahasiswa.nim') }}</div>
               <!-- Text Field Name -->
            <v-row>
                <v-col cols="5"> 
                    <v-text-field
                       v-model="editedItemMahasiswa.name"
                        label="Name"
                        :rules="nameRules"
                    ></v-text-field>
                </v-col>
            </v-row>

                <!-- Input Select Gender -->
            <v-row>
                <v-col cols="5"> 
                 <v-select
                    v-model="editedItemMahasiswa.gender"
                    :items="itemsGender"
                    label="Gender"
                    ></v-select>
                </v-col>
            </v-row>

               <!-- Input Select Department -->
            <v-row>
                <v-col cols="5"> 
                 <v-select
                    v-model="editedItemMahasiswa.department"
                    :items="itemsDepartment"
                    label="Department"
                    item-value="id"
                    item-text="department_name" 
                    ></v-select>
                </v-col>
            </v-row>

                  <!-- Text Field Phone -->
            <v-row>
                <v-col cols="5"> 
                    <v-text-field
                       v-model="editedItemMahasiswa.phone"
                        label="Phone"
                        :rules="phoneRules"
                       
                    ></v-text-field>
                </v-col>
            </v-row>

                  <!-- Text Field Email -->
            <v-row>
                <v-col cols="5"> 
                    <v-text-field
                       v-model="editedItemMahasiswa.email"
                        label="Email"
                        :rules="emailRules"
                    ></v-text-field>
                </v-col>
            </v-row>
          
           <v-row>
                <v-col cols="5"> 
                 <!-- Pop Up Dialog Succes / Faiiled -->
                    <v-dialog
                        v-model="dialog"
                        width ="500px" 
                    >
                        <v-card>
                            <v-card-title>
                                <p v-if="success && registration">Actor Registration Success</p>
                                <p v-if="!success && registration" >Actor Registration Failed</p>
                                 <p v-if="success && edit">Edit Actor Success</p>
                                <p v-if="!success && edit" >Edit Actor Failed</p>
                             
                            </v-card-title>

                            <v-card-text>
                                <p v-if="success"> Kamu Dapat Melihat Data Pada Tabel</p>
                                <p v-if="!success"> Silahkan Coba Lagi</p>
                            </v-card-text> 

                            <v-divider></v-divider>    

                            <v-card-actions>
                             <v-btn
                                v-if="edit"
                                color="primary"
                                @click.stop="dialog = !dialog"
                           
                             >
                                 Continue Editing
                             </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click.stop ="dialog = !dialog"
                                    color="primary"
                                    :to= "'/mahasiswa/:page'"
                                    
                                >
                                    OK
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </v-col>
            </v-row> 

            <!-- Action Button -->
            <v-row>
              
                <v-col cols="1"> 
                    <v-btn
                        color="primary"
                        @click.stop ="save"
                        :disabled ="!valid"
                    >
                    Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import axios from 'axios'
import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';
Vue.use(SimpleVueValidation);

const validatorNew = SimpleVueValidation.Validator
export default {

    // Props disini untuk membedakan proses registration / edit pada form
    props:{
        registration:{
            type: Boolean,
            default: false
        },
        edit :{
            type: Boolean,
            default: false  
        }
    },

    data(){
        return{
            duplikatNIMUpdated :false,
            dialog:false,
            resultAkhir:'',
            editedItemMahasiswa:{
                nim:'',
                name:'',
                gender:'',
                department:'',
                phone:'',
                email:''
                
            },

            itemsGender: ['Male','Female'],
            itemsDepartment:[],
            isSuccess : false,
            valid: false,
            //Merupakan rules untuk form input text (required)
            nimRules : [
                v => !!v || 'Mohon diisi terlebih dahulu',
                v => !!v.match("^[0-9]{2}-[0-9]{7}$") || '2angka-7angka',
               
            ],

            nameRules:[
                v => !!v || 'Mohon diisi terlebih dahulu',
                v => v.length <= 50 || 'Name must be less than 50 characters',
                v => v.length >= 6 || 'Name must be more than 6 characters'
            ],
            phoneRules:[
                v => !!v || 'Mohon diisi terlebih dahulu',
                v => v.match("^[0-9]{3}[ ][0-9]{3}[ ][0-9]{4}$") || '3angkaspasi3angkaspasi4angka'

            ],
            emailRules:[
                v => !!v || 'Mohon diisi terlebih dahulu',
                v => v.match( /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) || 'Invalid Email'
            ]

            

        }
    },

    //Computed hanya akan dijalankan ketika value berubah
    computed:{
        success(){
            return this.isSuccess
        },
    },

 

  
    methods: {
        save(){
            // Menjalankan save registration jika props registration bernilai true
            if(this.registration && this.valid){
                axios({
                method:'post',
                url: 'http://localhost:3000/api/mahasiswa/',
                data: this.editedItemMahasiswa
            })
                .then(response => {
                    this.isSuccess = true
                    this.dialog = true
                    console.log(response.data)
            })
                .catch(error => {
                    this.isSuccess = false
                    this.dialog = true
                    console.log(error)
                })
            }
            // Menjalankan save edit jika props edit bernilai true
            if(this.edit){
                console.log(this.editedItemMahasiswa)
                const id=this.$route.params.id
                axios({
                    method:'put',
                    url: `http://localhost:3000/api/mahasiswa/${id}`,
                    data: this.editedItemMahasiswa
                })
                .then(response => {
                    this.isSuccess = true
                    this.dialog = true
                    console.log(response.data)
            })
                .catch(error => {
                    this.isSuccess = false
                    this.dialog = true
                    console.log(error)
                })
                
            }
            
                
        },

        showDepartment(){
             axios
                .get(`http://localhost:3000/api/department/`)
                .then(response =>{
                    this.itemsDepartment = response.data.data
                            
                })
                .catch(error => console.log(error))
        },

        // onChange(event){
              
        //    axios
        //                     .get(`http://localhost:3000/api/mahasiswa/${event}`)
        //                     .then(response => {
        //                     var nimAxios = parseInt(response.data.jumlah)
                               
                              
        //                     if(nimAxios>1){
        //                             console.log('data nya duplikat')
        //                                this.duplikatNIMUpdated = true
        //                                 console.log(this.duplikatNIMUpdated == this.duplicated )
                                 
                                 
        //                         console.log('data duplikathayu')
        //                         // result = 'duplikat'
        //                     } else {
        //                         console.log('data nya engga duplikat')
        //                         this.duplikatNIMUpdated = false
        //                     }
                            
        //                     console.log(this.duplikatNIMUpdated + 'data akhir nih')
                         
        //                     return this.duplikatNIMUpdated
                            
        //                     })
        //                     .catch(error => console.log(error))

        // },
        // async duplikatNimValidate(){
            
        // await axios
        //     .get(`http://localhost:3000/api/mahasiswa/${this.editedItemMahasiswa.nim}`)
        //                     .then(response => {
        //                     var nimAxios = parseInt(response.data.jumlah)
                               
        //                     if(nimAxios>1){
                                
        //                        console.log('nim ini duplikat')
        //                     }
                            

                            
        //                     })
        //                     .catch(error => console.log(error))
        // }

        
    },
    created(){
        //Jika Props Edit bernilai true, maka form  akan diisi berdasrkan ID Actor yang di get 
        if(this.edit){

  
            axios
                .get(`http://localhost:3000/api/mahasiswa/${this.$route.params.id}`)
                .then(response =>{
                    this.mahasiswa =response.data.data[0]
                    this.editedItemMahasiswa=this.mahasiswa
                 
                            
                })
                .catch(error => console.log(error))
        }
         //Jika Props Registration bernilai true, maka form diisi oleh variabel kosong 
        if(this.registration){
            this.registration=this.editedItemMahasiswa
        }

        this.showDepartment()


       
    },

    mounted(){
         
            this.$validate()
          
      
    },

    // (){
          
    // },

    validators:{
        "editedItemMahasiswa.nim": function (value){
                    return validatorNew.value(value).custom(async function(){
                        var result = ''
                        await axios
                            .get(`http://localhost:3000/api/mahasiswaByNIM/${value}`)
                            .then(response => {
                            var nimAxios = parseInt(response.data.jumlah)
                                console.log(nimAxios + 'ini data duplikat nya')

                            //mode save
                            if(this.registration){
                                 if(nimAxios>=1){
                                this.valid = false;
                                       
                                 
                                 
                                console.log('data duplikathayu')
                                result = 'nim duplikat'
                                
                                this.resultAkhir = value
                            } else {
                                result = ''
                    
                            }

                            } 


                           // mode edit

                            if(this.edit){
                                 if(nimAxios>1){
                                this.valid = false;
                                       
                                 
                                 
                                console.log('data duplikathayu')
                                result = 'nim duplikat'
                                
                                this.resultAkhir = value
                            } else {
                                result = ''
                    
                            }

                            } 
                            
                            console.log(this.duplikatNIMUpdated + 'data akhir nih')
                     
                            
                            })
                            .catch(error => console.log(error))

                             
                            return result  
                    }
                    .bind(this)

                    );
                    

                },
                
    }
    

   
    
}
</script>