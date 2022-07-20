<template>
    <tr>
    <td>{{ nim }}</td>
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
        validate: function(dataItem) {

        }
    }
    
</script>