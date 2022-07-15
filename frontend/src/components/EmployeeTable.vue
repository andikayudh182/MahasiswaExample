<template>
    <div>
        <v-container>
            <v-row
            justify="end"
            >
                <v-col 
                cols="2"
                >
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                     <v-data-table
                    :headers="headers"
                    :items="mahasiswa"
                    :search="search"
                    
                    
                    >  
                        <template v-slot:top>
                            <v-toolbar
                            flat
                            >
                                <v-toolbar-title>Data Mahasiswa</v-toolbar-title>
                                <v-divider
                                class="mx-4"
                                inset
                                vertical
                                >
                                </v-divider>
                            <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.nim`]="props"
                        >
                            <v-edit-dialog
                            :return-value.sync="props.item.nim"
                            @save="editedItem"
                            >
                                {{ props.item.nim }}
                                <template v-slot:input>
                                    <v-text-field
                                    v-model="props.item.nim"
                                    :rules="nimRules"
                                    single-line 
                                    
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:[`item.name`]="props"
                        >
                            <v-edit-dialog
                            :return-value.sync="props.item.name"
                            @save="editedItem"

                            >
                                {{ props.item.name }}
                                <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.name"
                                        :rules="nameRules"
                                        single-line
                                        ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:[`item.gender`]="props">
                            <v-edit-dialog
                            :return-value.sync="props.item.gender"
                            @save="editedItem"
                            >
                                {{ props.item.gender }}
                                <template v-slot:input>
                                    <v-text-field
                                    v-model="props.item.gender"
                                    :rules="genderRules"
                                    single-line
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:[`item.department`]="props">
                            <v-edit-dialog
                            :return-value.sync="props.item.department"
                            @save="editedItem"
                            >
                                {{ props.item.department }}
                                <template v-slot:input>
                                    <v-text-field
                                    v-model="props.item.department"
                                    :rules="departmentRules"
                                    single-line                                    
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:[`item.phone`]="props">
                            <v-edit-dialog
                            :return-value.sync="props.item.phone"
                            @save="editedItem"
                            >
                                {{ props.item.phone }}
                                <template v-slot:input>
                                    <v-text-field
                                    v-model="props.item.phone"
                                    :rules="phoneRules"
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                        <template v-slot:[`item.email`]="props">
                            <v-edit-dialog
                            :return-value.sync="props.item.email"
                            @save="editedItem"
                            >
                                {{ props.item.email }}
                                <template v-slot:input>
                                    <v-text-field
                                    v-model="props.item.email"
                                    :rules="emailRules"
                                    single-line
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>'
            <v-row
                class="justify-end"
                >        
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2 mr-2"
                    @click="save"
                
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    @click="deleteItemConfirm"
                
                    >
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>                       
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'


export default {
    data: () => ({
            search: '',
            headers: [
            {
                text: 'NIM',
                value: 'nim'
            },
            { text: 'Name', value: 'name' },    
            { text: 'Gender', value: 'gender' },
            { text: 'Department', value: 'department' },
            { text: 'Phone', value: 'phone' },
            { text: 'Email', value: 'email' },
            
            ],
            mahasiswa: [],
            editedIndex: -1,
            editedItem: {
                nim: '',
                name: '',
                gender: '',
                department: '',
                phone: '',
                email: '',
            },
            nimRules: [
                v => !!v || 'NIM is required',
                v => v.length == 10 || 'NIM harus 10 digit',
            ],
            nameRules: [
                v => !!v || 'Name is required',
            ],
            genderRules: [
                v => !!v || 'Gender is required',
                v => v === 'Male'|| v === 'Female' || 'Male or Female'
            ],
            departmentRules: [
                v => !!v || 'Department is required',
                v => v == [(1,2,3,4,5,6,7,8,9,10,11,12,13)] || 'Department is 1 - 13'
            ],
            phoneRules: [
                v => !!v || 'Phone is required'
            ],
            emailRules: [
                v => !!v || 'Email is required'
            ], 
        }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    // created () {
    //     this.initialize()
        
    // },
      
    methods: {
        itemRowBackground: function (item) {
            return item.editedItem ? 'style-1' : 'style-2'
        },
        // initialize() {
        //     this.mahasiswa = [
        //     {
        //         nim: '72-4584118',
        //         name: 'Lammond Lucchi',
        //         gender: 'Male',
        //         department: 6,
        //         phone: '528 123 9628',
        //         email: 'llucchi0@illinois.edu'
        //     },
        //     {
        //         nim: '39-7236358',
        //         name: 'Rachele Keitch',
        //         gender: 'Female',
        //         department: 7,
        //         phone: '750 284 2934',
        //         email: 'rkeitch1@photobucket.com'
        //     },
        // ]
        
        // },
        // validation() {
        //     this.mahasiswa(id) [
        //         {
        //             if (minLength = minLength.id(2) && maxLength == maxLength.id(10)) {
        //                 return this.id
        //             }, else: {
        //                 errorMessage: '10 digit'
        //             }
        //         },
        //         {

        //         }
        //     ]
        // }
    
    },

    // validate() {
    //     this.valid=0;
    //     this.validMessage=[];
    //     if(this.id.length < 10 || this.name.length > 1){
    //             this.validMessage.push("The name should be in between 3 and 50 characters.")
    //         }
    //         if(this.valid.length){
    //             this.valid=1;
    //         }
    //         return this.valid;
    // },

    editedItems (item) {
        // this.editedIndex=this.mahasiswa.indexOf(item)
        this.editedItem=Object.assign({}, item)
        // this.close()
       
    },
    deleteItemConfirm () {
        this.mahasiswa.splice(this.editedIndex, 1)
        this.close()
    },
    save () {
        if (this.editedIndex > -1) {
          Object.assign(this.mahasiswa[this.editedIndex], this.editedItem)
        } else {
          this.mahasiswa.concat(this.editedItem,this.mahasiswa)
        }
        this.close()
    },
    mounted(){
        axios
            .get('http://localhost:3000/api/mahasiswa/')
            .then(response => {
                this.mahasiswa = response.data.data
                console.log(response.data)
            })
            .catch(error => console.log(error))

    }
    }


</script>

<style>
  .style-1 {
    background-color: red
}

.style-2 {
    background-color: yellow
}
</style>