<template>
    <tr>
    <td>
        {{ nim }}
        asdasd
        </td>
    <td>{{ name }}</td>
    <td>{{ gender }}</td>
    <td>{{ department }}</td>
    <td>{{ phone }}</td>
    <td>{{ email }}</td>
    </tr>

</template>

<script>
    export const validationMessageCreators = {
        required: () => 'Required',
        nim: () => 'Invalid NIM',
        txtMinLen: ({ $params }) => {
            const min = plural(
            'no characters | one character | {n} characters',
            $params.txtMinLen.min
            )
            return `Must be at least ${min}`
        }
    }
    export default {
        props: ['nim','name','gender','department','phone','email'],
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
                v => v === [('1','2','3','4','5')] || 'Department is 1 - 13'
            ],
            phoneRules: [
                v => !!v || 'Phone is required'
            ],
            emailRules: [
                v => !!v || 'Email is required'
            ], 
        validate: function(dataItem) {

        }
    }
    
</script>