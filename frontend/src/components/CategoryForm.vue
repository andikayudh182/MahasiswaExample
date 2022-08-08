<template>
    <v-form v-model="valid">
        <v-container >
            <h1 class="mb-20" v-if="registration"> Registration Form Category</h1>
            <h1 class="mb-20" v-if="edit"> Edit Form Category</h1>

            <!-- Text Field First Name -->
            <v-row>
                <v-col cols="5"> 
                    <v-text-field
                        v-model="editedItemCategory.name"
                        label="Category  Name"
                        :rules="nameRules"
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
                                <p v-if="success && registration">Category Registration Success</p>
                                <p v-if="!success && registration" >Category Registration Failed</p>
                             <p v-if="success && edit">Edit Category Success</p>
                                <p v-if="!success && edit" >Edit Category Failed</p>
                             
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
                                    :to= "'/category'"
                                    
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
           
            dialog:false,
            editedItemCategory:{
                name:''
            
                
            },
            isSuccess : false,
            valid: false,
            //Merupakan rules untuk form input text (required)
            nameRules : [
                v => !!v || 'Mohon diisi terlebih dahulu',
                v => v.length <= 25 || 'Name must be less than 25 characters',
                v => v.length >= 3 || 'Name must be more than 3 characters',
                  
            ],

        }
    },

    //Computed hanya akan dijalankan ketika value berubah
    computed:{
        success(){
            return this.isSuccess
        }
    },
    methods: {
        save(){
            // Menjalankan save registration jika props registration bernilai true
            if(this.registration){
                axios({
                method:'post',
                url: 'http://localhost:3000/api/category/',
                data: this.editedItemCategory
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
                const id=this.$route.params.id
                axios({
                    method:'put',
                    url: `http://localhost:3000/api/category/${id}`,
                    data: this.editedItemCategory
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
            
                
        }
    },
    created(){
        //Jika Props Edit bernilai true, maka form  akan diisi berdasrkan ID Category yang di get 
        if(this.edit){
            axios
                .get(`http://localhost:3000/api/category/${this.$route.params.id}`)
                .then(response =>{
                    this.category =response.data[0]
                    this.editedItemCategory=this.category

                })
                .catch(error => console.log(error))
        }
         //Jika Props Registration bernilai true, maka form diisi oleh variabel kosong 
        if(this.registration){
            this.registration=this.editedItemCategory
        }
       
    }
    
}
</script>