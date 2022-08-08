<template>
    <tr>
            
            <td ref="myNIM">{{ nim }} </td>
            <td ref="myName">{{ name }} </td>
            <td ref="myGender">{{ gender }}</td>
            <td ref="myDepartment">{{ department }}</td>
            <td ref="myPhone" >{{ phone }}</td>
            <td ref="myEmail">{{ email }}</td>
        
    </tr>
</template>

<script>

    export default {
        data() {
            return {
                
            }
        },
        props: ['nim','name','gender','department','phone','email'],
       
            methods: {
                validateNIM() {
                    var nim = this.$refs.myNIM.innerText

                    if (nim.length > 0){
                        if (nim.match("^[0-9]{2}-[0-9]{7}$")){
                            console.log(nim)
                        } else {
                            console.log("gagal maning")
                            this.$refs.myNIM.innerHTML = nim.concat("<br><p style='color: red'>2angka-7angka</p>");
                        }
                        
                    } else {
                        this.$refs.myNIM.innerHTML = nim.concat("<br><p style='color: red'>NIM tidak boleh kosong</p>");
                    }
                },

                validateName(){
                     var name = this.$refs.myName.innerText

                     if (name.length>0){
                        if (name.length < 6){
                             console.log("nama pendek")
                            this.$refs.myName.innerHTML = name.concat("<br><p style='color: red'>Minimal 6 karakter </p>");
          
                        } else {
                            console.log("aman")
                        }
                      
                     } else {
                        this.$refs.myName.innerHTML = name.concat("<br><p style='color: red'>Nama tidak boleh kosong</p>");
                     }

                },

                  validateGender(){
                     var gender = this.$refs.myGender.innerText

                     if (gender.length>0){
                        if(gender.match("Male")|| gender.match("Female")){
                            console.log("gender aman")
                        } else {
                            this.$refs.myGender.innerHTML = gender.concat("<br><p style='color: red'>Male or Female</p>");
                        }
                      
                     } else {
                        this.$refs.myGender.innerHTML = gender.concat("<br><p style='color: red'>Gender tidak boleh kosong</p>");
                     }

                },

                validateDepartment(){
                     var department = this.$refs.myDepartment.innerText

                     if (department.length>0){
                        if(parseInt(department)<11){
                            console.log("department aman")
                        } else {
                             this.$refs.myDepartment.innerHTML = department.concat("<br><p style='color: red'>Hanya boleh 1 sampai 10</p>");
                        }
                    
                     } else {
                        this.$refs.myDepartment.innerHTML = department.concat("<br><p style='color: red'>Department tidak boleh kosong</p>");
                     }

                },

                 validatePhone(){
                     var phone = this.$refs.myPhone.innerText

                     if (phone.length>0){
                       if (phone.match("^[0-9]{3}[ ][0-9]{3}[ ][0-9]{4}$")){
                            console.log(phone + "phone aman")
                        } else {
                            console.log("gagal maning")
                            this.$refs.myPhone.innerHTML = phone.concat("<br><p style='color: red'>3spasi3spasi4angka</p>");
                        }
                        
                    
                     } else {
                        this.$refs.myPhone.innerHTML = phone.concat("<br><p style='color: red'>Phone tidak boleh kosong</p>");
                      }

                },

                validateEmail(){
                     var email = this.$refs.myEmail.innerText
                    const regexExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

                     if (email.length>0){
                        if(regexExp.test(email)==true){
                            console.log("email amann")
                        } else {
                            this.$refs.myEmail.innerHTML = email.concat("<br><p style='color: red'>Bukan email</p>");
                        }
                        
                    
                     } else {
                        this.$refs.myEmail.innerHTML = email.concat("<br><p style='color: red'>Email tidak boleh kosong</p>");
                      }

                },

            },
            
            mounted() {
                this.validateNIM()
                this.validateName()
                this.validateGender()
                this.validateDepartment()
                this.validatePhone()
                this.validateEmail()
                    
            }
           
    }
    
   
</script>