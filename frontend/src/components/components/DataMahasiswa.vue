<template>

    <div class="overflow-auto">

    <table class="table table-bordered table-striped mt-5" id="myTable">
        <thead>
            <tr>
                <th>NIM</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Email</th>
            </tr>            
        </thead>
        <tbody>
            <RowTable v-for='(mhs, index) in mahasiswa' :key="index" v-bind="mhs"/>
        </tbody>

    </table>
    
  

    </div>
    
        
</template>

<script>
import RowTable from "./RowTable.vue"
import axios from 'axios'
import $ from 'jquery'


export default {

    components: {
        RowTable,
      
    },
    data() {
        return {
            mahasiswa: [],
            listPage: [],
            // perPage: 3,
          

        }
    },

    
    mounted() {
        axios
            .get('http://localhost:3000/api/mahasiswa/')
            .then(response => {
                this.mahasiswa = response.data.data
                $(document).ready(function () {
                    $('#myTable').DataTable();
                    $('.dataTables_length').addClass('bs-select');
                    });
            })
            .catch(error => console.log(error))

        

       
    },
   

}

</script>