<template>
    <!-- Akan Mengisi data jika data category tidak null -->
    <div v-if="category" class="ml-4">
        <h1>Details Category {{category.category_id}}</h1>
        <table>
            <tr>
                <td>Category Name </td>
                <td class="titikdua">:</td>
                <td>{{ category.name}}</td>
            </tr>
        
            <tr>
                <td>Last  Update </td>
                <td class="titikdua">:</td>
                <td>{{ category.last_update}}</td>
            </tr>
        </table>

    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            category:null
        }
    },
    methods: {
        // Fetching data dengan method get pada axios dimana method ini akan mengambil sesuai parameter id yang di post pada route
        fetchData(){
            axios
            .get(`http://localhost:3000/api/category/${this.$route.params.id}`)
            .then(response =>{
                this.category =response.data[0]
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
<style scoped>
.titikdua{
    text-align: center;
    vertical-align: middle;
    width: 50px;
}
</style>