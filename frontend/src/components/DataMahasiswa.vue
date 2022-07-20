<template>

    <table>
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
    <div>
        <button
        class="button" @click="pageNav('left')"
        >
            Previous
        </button>
        <button
        class="button" @click="pageNav('right')"
        >
            Next
        </button>
    </div>
        
</template>

<script>
import RowTable from "./RowTable.vue"
import axios from 'axios'

export default {

    components: {
        RowTable
    },
    data() {
        return {
            mahasiswa: [],
            listPage: [],
            startPage: 0,
            endPage: 10

        }
    },
    method: {
        pageNav: function (direction) {
            if (direction === 'left') {
                this.startPage -= 10
                this.endPage -= 10
            } else if (direction === 'right') {
                this.startPage += 10
                this.endPage += 10
            }
            this.listPage = this.mahasiswa.slice(this.startPage, this.endPage)
        }
    },
    mounted() {
        axios
            .get('http://localhost:3000/api/mahasiswa/')
            .then(response => {
                this.mahasiswa = response.data.data
                this.pageNav()
            })
            .catch(error => console.log(error))
    }
}

</script>