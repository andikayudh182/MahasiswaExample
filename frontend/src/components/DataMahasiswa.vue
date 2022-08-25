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

         <v-col>
                    <v-btn
                    height="49"
                    color="green"
                    @click.stop ="exportPDF"

                >
                export
                </v-btn>
                </v-col>
        <!-- Action Button -->
        <h1 id="title">data mahasiswa</h1>
        <table class=" cell-border table table-bordered table-striped"  >
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
                :length="lengthpage"
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
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

const doc = new jsPDF()



export default {

    components: {
        RowTable,
      
    },
    data() {
        return {     
            mahasiswa: [],
            // allMahasiswa:[],
            listPage: [],
            editedLimit:{
                limit: this.$route.params.page * 10 - 10
            },
            keyword:'',
            keywordClicked:false,

            lengthpage:'',
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

        this.resultIdCount()
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
                    console.log( + 'tes this mahasiswa')
                     console.log("jumlah offset" + this.editedLimit.limit)
                })
                .catch(error => {
                    // Tampilkan dialog regitrasi gagal
                 
                    console.log(error)
                })

                
                
        

                //  console.log(this.mahasiswa)

        },

        resultIdCount(){
             axios
                .get(`http://localhost:3000/api/mahasiswacountId/`)
                .then(response =>{
                    this.lengthpage = response.data.data[0].resultid
                    console.log(response.data.data[0].resultid+ "masuk")
                            
                })
                .catch(error => console.log(error))
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

        async exportPDF(){
            let allMahasiswa = []
         await axios
                .get(`http://localhost:3000/api/mahasiswajoin/`)
                .then(response =>{
                      response.data.data.forEach(element => {
                 
                        allMahasiswa.push([
                            element.mhsid,
                            element.nim,
                            element.name,
                            element.gender,
                            element.department_name,
                            element.phone,
                            element.email]) 
                            
                    
                    });
             
                })
                .catch(error => console.log(error))

            
            autoTable(doc, {
  
            head: [['ID', 'NIM', 'Name', 'Gender', 'Department', 'Phone', 'Email']],
            body: allMahasiswa,
   
  
            })

            doc.save('table.pdf')

          
        }

      

        
        
       
    },
    

 

    

}

</script>

<style>
    .table {
        text-align: center;
    }
</style>

