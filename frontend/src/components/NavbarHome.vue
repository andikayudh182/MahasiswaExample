<template>
    <div>
    
        <v-app-bar 
        dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Data Mahasiswa</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            absolute
            dark
            temporary
        >
            <v-list>
                <v-list-item-group>
                    <v-list-item v-for="(item, index) in items" :key="index" :to="item.route">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                <v-title v-text="item.title"></v-title>
                            </v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                </v-list-item-group>
            </v-list>

        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            items: [
                {icon: 'mdi-badge-account-horizontal', title: 'List Mahasiswa', route: '/'}
            ]
        }
    }
}
</script>