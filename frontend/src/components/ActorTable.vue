<template>
    <v-container>

          <!-- <v-row class="mt-10">
            <v-col>
                <h1 align="center" width="20px" >List Of Actor  </h1>
            </v-col>
        </v-row>
        
        Searchbox
        <v-row >
            <v-spacer></v-spacer>
            <v-col cols="5">
                <v-text-field
                   append-icon="mdi-magnify"
                    v-model="search"
                    single-line
                    label="Search Actor..."
                ></v-text-field>
            </v-col>
        </v-row>

      
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="actor"
                    :search="search"
                >
                    Delete Dialog
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-dialog v-model="dialogDeleteActor" max-width="700px">
                                <v-card>
                                    <v-card-title class="headline">Apakah anda yakin menghapus data  tersebut ?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color ="red" @click="closeDeleteActor">Cancel</v-btn>
                                        <v-btn color ="success" @click="deleteActorConfirm">Ok</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    V Slot Actor
                   <template v-slot:[`item.first_name`]="{ item }">
                       <router-link :to="`/actor/details/${item.actor_id}/${linkNeated(item.first_name)}`">
                           {{item.first_name }}
                       </router-link>

                   </template>
                    Actions colom
                    <template v-slot:[`item.actions`]="{ item }">

                        <router-link style="text-decoration:none; color:app"   :to="`/actor/edit/${item.actor_id}/${linkNeated(item.first_name)}`">
                            <v-icon
                                small
                                class="mr-2"
                            >
                                mdi-pencil 
                            </v-icon>
                          
                           
                        </router-link>
                       Edit
                        <v-icon
                            small
                            @click="deleteActorItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                        Delete
                    </template>
                </v-data-table>
            </v-col>
        </v-row> -->
        <div>

            <!-- <input type="file" id="file" ref="myFiles" class="custom-file-input" 
            @change="previewFiles" multiple> -->
            <!-- <input type="file" @change="previewFiles" multiple> -->

    <!-- <button @click="submitFile">Upload</button> -->

    <!-- <form method="POST" action="http://localhost:3000/api/file" enctype="multipart/form-data" >
    <input type="file" name="file" ref="myFiles"  @change="previewFiles"/>
    <input type="submit" value="Upload"/> 
    </form> -->

    <!-- <input type="file" ref="myFiles" name="myFile" @change="previewFiles" > <br><br> -->
   

 
    <!-- <p>Dir is: {{ dir }}</p> -->

   
    <!-- <a href="#" @click.stop="showFileName">Show Name</a> -->

   

    
        <h2>Upload and Import CSV File To Database</h2>
        <hr/>
        <label>File
            <input type="file" @change="handleFileUpload( $event )" />
        </label>
    
        <v-btn v-on:click="submitFile()" color="info">Upload</v-btn>
        <br>
        <br>
         <v-btn
    elevation="2"
    @click.stop="showDir"
    color="primary"
  >Import CSV</v-btn>

     <hr><hr>

  <p>Pesan hasil import CSV : {{ message }}</p>


       
        
    </div>
  

    </v-container>
    
</template>

<script>
import axios from 'axios'
// import $ from 'jquery'

export default {
    data(){
        return{
            files: [],
            message : 'belum import',
            editedItem:{
            dir:''},
            file :''
            // testing:'aa',
            // search: '',
            // dialogDeleteActor: false,
            // selectedItemIndex: -1,
            // headers: [
            //     {text: 'ID', value: 'actor_id'},
            //     {text: 'First Name', value: 'first_name'},
            //     {text: 'Last Name', value: 'last_name'},
            //     {text: 'Actions', value: 'actions'}
            // ],
            // // Data Actor disimpan pada array kosong yang akan diisi ketika di get oleh axios
            // actor: [
                
            // ]
        }
    },
    methods: {
        // linkNeated(link){
        //     return link.replace(/\s+/g, '-').toLocaleLowerCase()
        // },

        // deleteActorItem(item){
        //     console.log(item)
        //     this.selectedItemIndex = this.actor.indexOf(item)
        //     this.dialogDeleteActor = true
        
        // },
        // closeDeleteActor(){
        //     this.dialogDeleteActor = false
        //     this.$nextTick(() => {
        //         this.selectedItemIndex = -1
        //     })
        // },
        // deleteActorConfirm(){
        //     const actorDelete = this.actor[this.selectedItemIndex]
            
        //     axios
        //         .delete(`http://localhost:3000/api/actor/${actorDelete.actor_id}`)
        //         .then(response => {
                            
        //             this.actor.splice(this.selectedItemIndex, 1)
        //             this.closeDeleteActor()
        //             console.log(response.data)
        //         })
        //         .catch(error => console.log(error))
        // },

        // getValueFromFile(){
        //      var a = this.$refs.myFile.files
        // //     console.log("testing" + a)
        // //     console
        // // },
        previewFiles: function(event) {
         this.files = this.$refs.myFiles.files
        //  var path = (window.URL || window.webkitURL).createObjectURL(this.files);
        //  console.log('path', path);
         let dir = event.target.files[0].name
         this.editedItem.dir = dir
        
         },

        //  uploadFile(){
        //          axios({
        //         method:'post',
        //         url: 'http://localhost:3000/api/file/',
        //         data: {}
        //     })
        //         .then(response => {
        //             console.log(response.data)
                  
                    
                    
        //     })
        //         .catch(error => {
        //             console.log(error)
        //         })
        //  },
        showDir(){
                if(this.message == 'belum import'){
                        this.message = 'gagal import'
                    }
            axios({
                method:'post',
                url: 'http://localhost:3000/api/importmahasiswa/',
                data: this.editedItem
            })
                .then(response => {
                    console.log(response.data)
                    this.message = 'berhasil import'
                
                    
                    
            })
                .catch(error => {
                    console.log(error)
                })
        },

        submitFile() {
            let formData = new FormData();

            console.log(this.file + " ini file sekarang bos")
            formData.append('file', this.file);
            console.log('>> formData >> ', formData);

            // You should have a server side REST API 
            axios.post( 'http://localhost:3000/api/file',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            ).then(function(){
            console.log('SUCCESS!!');
            })
            .catch(function(){
            console.log('FAILURE!!');
            });
        },
        handleFileUpload(event) {
           this.file = event.target.files[0];
           this.editedItem.dir = this.file.name
        }
       
    },
    // Memanggil axios get disetiap waktunya untuk mendapatkan data terbaru dengan axios get
    // mounted (){
    //     // axios
    //     //     .get('http://localhost:3000/api/actor/')
    //     //     .then(response => {
    //     //         this.actor= response.data
    //     //         console.log("Berhasil Get Data",response.data)

    //     //     })
    //     //     .catch(error => console.log(error));

    //         this.previewFiles()
    // }

    
}
    
</script>