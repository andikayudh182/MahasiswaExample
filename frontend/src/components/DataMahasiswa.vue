<template>
    <div class="ma-4">
      <!-- Text Field NIM -->
        <v-row >
            <v-col cols="2" class="justify-end"> 
                <v-text-field
                    v-model="keyword"
                    label="Search"
                    solo
                    
            
                >
                </v-text-field>
            </v-col>
                <v-col>
                    <v-btn
                    height="49"
                    color="primary"
                    @click.stop ="search"

                >
                Search
                </v-btn>
                </v-col>
        </v-row>
        <!-- Action Button -->

        <table class=" cell-border table table-bordered table-striped" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NIM</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                
                </tr>            
            </thead>
            <tbody>
                <RowTable v-for='(mhs,index) in mahasiswa' :key="index" v-bind="mhs"/>
            </tbody>
        </table>
        <p> Showing from row : {{ editedLimit.limit+1 }} to {{ editedLimit.limit+10}} </p>
        <div class="text-center">
            <router-link style="text-decoration:none;" :to="`/mahasiswa/${this.page}/`">
                <v-pagination
                v-model="page"
                :length="100"
                :total-visible="7"
                @change="page = $event.target.value"
                circle
                ></v-pagination>
            </router-link>
        </div>
    </div>
</template>

<script>
import RowTable from "./RowTable.vue"
import axios from 'axios'
// import $ from 'jquery'


export default {

    components: {
        RowTable,
      
    },
    data() {
        return {     
            mahasiswa: [],
            listPage: [],
            editedLimit:{
                limit: this.$route.params.page * 10 - 10
            },
            keyword:'',
            keywordClicked:false,

        
            page : null
        }
    },

     watch: {
        page: function page(new_val, old_val) {
    
        console.log('pagesize changed', new_val, old_val)
          this.editedLimit.limit = new_val * 10 - 10
       
        if(this.keywordClicked){
        //   this.page = 1
 
            this.search()
            
        }
        else{
          
            this.initiatePage()
        }
    },
  },

    created(){
        if(this.keywordClicked){
            this.search()
        }
        else{
             this.initiatePage()

        }
       
        console.log(this.$route.params.page + 'testing console don')

    },

    

    methods:{
         initiatePage(){
           
             axios(
                {
                    method: 'post',
                    url: 'http://localhost:3000/api/mahasiswajoin/',
                    data: this.editedLimit
                })
                .then(response => {
                this.keywordClicked = false,
                     this.mahasiswa = response.data.data
                    console.log(response.data)
                     console.log("jumlah offset" + this.editedLimit.limit)
                })
                .catch(error => {
                    // Tampilkan dialog regitrasi gagal
                 
                    console.log(error)
                }) 

                //  console.log(this.mahasiswa)

        },

         search(){
           
             axios(
                {
                    method: 'post',
                    url: `http://localhost:3000/api/mahasiswa/search?keyword=${this.keyword}`,
                    data: this.editedLimit
                })
                .then(response => {
                        this.keywordClicked = true
                              
                        this.mahasiswa = response.data.data
                    console.log(response.data)
                     console.log("hasil search" + this.editedLimit.limit)
                })
                .catch(error => {
                    // Tampilkan dialog regitrasi gagal
                 
                    console.log(error)
                }) 
        
                //  console.log(this.mahasiswa)

        },

      

        
        
       
    }

 

    

}

</script>

<style>
    .table {
        text-align: center;
    }
</style>

