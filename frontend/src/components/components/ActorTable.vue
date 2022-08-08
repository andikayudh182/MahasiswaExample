<template>
    <v-container>

          <v-row class="mt-10">
            <v-col>
                <h1 align="center" width="20px" >List Of Actor  </h1>
            </v-col>
        </v-row>
        
        <!-- Searchbox -->
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
                    <!-- Delete Dialog -->
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
                    <!-- V Slot Actor -->
                   <template v-slot:[`item.first_name`]="{ item }">
                       <router-link :to="`/actor/details/${item.actor_id}/${linkNeated(item.first_name)}`">
                           {{item.first_name }}
                       </router-link>

                   </template>
                    <!-- Actions colom -->
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
        </v-row>

    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            testing:'aa',
            search: '',
            dialogDeleteActor: false,
            selectedItemIndex: -1,
            headers: [
                {text: 'ID', value: 'actor_id'},
                {text: 'First Name', value: 'first_name'},
                {text: 'Last Name', value: 'last_name'},
                {text: 'Actions', value: 'actions'}
            ],
            // Data Actor disimpan pada array kosong yang akan diisi ketika di get oleh axios
            actor: [
                
            ]
        }
    },
    methods: {
        linkNeated(link){
            return link.replace(/\s+/g, '-').toLocaleLowerCase()
        },

        deleteActorItem(item){
            console.log(item)
            this.selectedItemIndex = this.actor.indexOf(item)
            this.dialogDeleteActor = true
        
        },
        closeDeleteActor(){
            this.dialogDeleteActor = false
            this.$nextTick(() => {
                this.selectedItemIndex = -1
            })
        },
        deleteActorConfirm(){
            const actorDelete = this.actor[this.selectedItemIndex]
            
            axios
                .delete(`http://localhost:3000/api/actor/${actorDelete.actor_id}`)
                .then(response => {
                            
                    this.actor.splice(this.selectedItemIndex, 1)
                    this.closeDeleteActor()
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    },
    // Memanggil axios get disetiap waktunya untuk mendapatkan data terbaru dengan axios get
    mounted (){
        axios
            .get('http://localhost:3000/api/actor/')
            .then(response => {
                this.actor= response.data.data
                console.log("Berhasil Get Data",response.data)

            })
            .catch(error => console.log(error))
    }

    
}
    
</script>