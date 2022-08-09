<template>
    <div>
        <v-app-bar
            app
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
            <v-toolbar-title>Dashboard</v-toolbar-title>
            
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
  
            app
            temporary
         
        >



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
                {icon:'mdi-microsoft-xbox', title:'Dashboard', route:'/mahasiswa/1'},
                {icon:'mdi-account-plus', title:'Register Mahasiswa', route:'/mahasiswaregistration'},
                {icon:'mdi-file-import', title:'Import File', route:'/import'},
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