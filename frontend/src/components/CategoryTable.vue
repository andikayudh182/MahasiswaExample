<template>
    <v-container>

          <v-row class="mt-10">
            <v-col>
                <h1 align="center" width="20px" >List Of Category  </h1>
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
                    label="Search Category..."
                ></v-text-field>
            </v-col>
        </v-row>

      
        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="category"
                    :search="search"
                >
                    <!-- Delete Dialog -->
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-dialog v-model="dialogDeleteCategory" max-width="700px">
                                <v-card>
                                    <v-card-title class="headline">Apakah anda yakin menghapus data  tersebut ?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color ="red" @click="closeDeleteCategory">Cancel</v-btn>
                                        <v-btn color ="success" @click="deleteCategoryConfirm">Ok</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <!-- V Slot Category -->
                   <template v-slot:[`item.name`]="{ item }">
                       <router-link :to="`/category/details/${item.category_id}/${linkNeated(item.name)}`">
                           {{item.name }}
                       </router-link>

                   </template>
                    <!-- Actions colom -->
                    <template v-slot:[`item.actions`]="{ item }">

                        <router-link style="text-decoration:none;" :to="`/category/edit/${item.category_id}/${linkNeated(item.name)}`">
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
                            @click="deleteCategoryItem(item)"
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
         
            search: '',
            dialogDeleteCategory: false,
            selectedItemIndex: -1,
            headers: [
                {text: 'ID', value: 'category_id'},
                {text: 'Category Name', value: 'name'},
                {text: 'Actions', value: 'actions'}
            ],
            // Data Category disimpan pada array kosong yang akan diisi ketika di get oleh axios
            category: [
                
            ]
        }
    },
    methods: {
        linkNeated(link){
            return link.replace(/\s+/g, '-').toLocaleLowerCase()
        },

        deleteCategoryItem(item){
            console.log(item)
            this.selectedItemIndex = this.category.indexOf(item)
            this.dialogDeleteCategory = true
        
        },
        closeDeleteCategory(){
            this.dialogDeleteCategory = false
            this.$nextTick(() => {
                this.selectedItemIndex = -1
            })
        },
        deleteCategoryConfirm(){
            const categoryDelete = this.category[this.selectedItemIndex]
            
            axios
                .delete(`http://localhost:3000/api/category/${categoryDelete.category_id}`)
                .then(response => {
                            
                    this.category.splice(this.selectedItemIndex, 1)
                    this.closeDeleteCategory()
                    console.log(response.data)
                })
                .catch(error => console.log(error))
        }
    },
    // Memanggil axios get disetiap waktunya untuk mendapatkan data terbaru dengan axios get
    mounted (){
        axios
            .get('http://localhost:3000/api/category/')
            .then(response => {
                this.category= response.data
                console.log("Berhasil Get Data",response.data)

            })
            .catch(error => console.log(error))
    }

    
}
    
</script>