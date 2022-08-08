<template>
    <div>
        <v-app-bar
            app
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
            <v-toolbar-title>Validation Data After Import</v-toolbar-title>
            
            <v-spacer></v-spacer>
                 <v-switch
                     :value="darkMode" 
                     @change="toggleDarkMode" 
                     :label="`${switchLabel}`"
                     hide-details
                    ></v-switch>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            app
            temporary
         
        >

            <!-- Avatar Admin -->
            <v-row justify="center" class="mt-5">
                <v-col cols="7">
                    <v-avatar
                        size="150"
                    >
                        <img src="/191524034.jpg" alt="">
                    </v-avatar>
                </v-col>
            </v-row>

            <!-- Nama Admin -->
            <v-row justify="center" class="mt-5">
                <v-col cols="8"> 
                    <p app>Andika Yudha Riyanto </p>
                </v-col>
            </v-row>


            <v-list
               dense
               nav
            >
                <v-list-item-group
                    v-model="group"
                >
                    <!-- item -->
                    <v-list-item v-for="(item, index) in items" :key="index" :to="item.route">
                        <!-- icon -->
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <!-- title -->
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>

        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data(){
        return {
            drawer :false,
            items:[
                {icon:'mdi-microsoft-xbox', title:'Dashboard', route:'/'},
                {icon:'mdi-account', title:'List Actor', route:'/actor'},
                {icon:'mdi-apps', title:'List Category', route:'/category'},
                {icon:'mdi-account-plus', title:'Register Actor', route:'/actor/register-new-actor'},
                {icon:'mdi-plus-outline', title:'Register Category', route:'/category/register-new-category'}
            ],
             darkMode: false
        }
    },
    methods: {
      toggleDarkMode: function () {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.darkMode = !this.darkMode;
      }
    },
    computed: {
      switchLabel: function () {
        return this.darkMode ? 'Light' : 'Dark';
      }
    },
    watch:{
        group(){
            this.drawer =false
        }
    }
}
</script>