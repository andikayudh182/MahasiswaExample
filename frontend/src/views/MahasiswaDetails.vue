<template>
    <!-- Akan Mengisi data jika data actor tidak null -->
    <div>
        <h1>Testing</h1>
        <table>
            <tr>
                <td>First Name </td>
                <td class="titikdua">:</td>
                <td>{{ mahasiswa.nim}}</td>
            </tr>
            <tr>
                <td>Last  Name  </td>
                <td class="titikdua">:</td>
                <td>{{ mahasiswa.name}}</td>
            </tr>
            <tr>
                <td>Last  Update </td>
                <td class="titikdua">:</td>
                <td>{{ mahasiswa.gender}}</td>
            </tr>
        </table>
        
   
    
        


    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            // actor:null
            mahasiswa: null
        }
    },
    methods: {
        // Fetching data dengan method get pada axios dimana method ini akan mengambil sesuai parameter id yang di post pada route
        fetchData(){
            axios
            .get(`http://localhost:3000/api/mahasiswa/${this.$route.params.nim}`)
            .then(response =>{
                this.mahasiswa =response.data.data[0]
                console.log("Berhasil Detail")
            })
            .catch(error => console.log(error
            ))
        }
    },
    //Akan dijlankan jika componentnya dibuat 
    created(){
        this.fetchData()
    }
}
</script>
<!-- <style scoped>
/* .titikdua{
    text-align: center;
    vertical-align: middle;
    width: 50px;
} */
</style> -->