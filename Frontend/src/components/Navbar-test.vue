<template>
    <header>
        <!--navbar-->
        <nav class="navbar is-fixed-top">
            <div class="navbar-brand">

                <div role="button" @click="showMobileMenu = !showMobileMenu" class="navbar-burger burger white "
                     :class="{'is-active':showMobileMenu}">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            </div>
            <div class="navbar-menu has-text-left" :class="{'is-active':showMobileMenu}">
                <div class="navbar-end">
                    <a class="navbar-item is-hidden-desktop">
                        teste1
                    </a>

                    <a class="navbar-item">
                        teste2
                    </a>

                    <a class="navbar-item">
                        teste3
                    </a>
                </div>

            </div>

        </nav>
    </header>
</template>

<script>

    export default {
        name: 'Navbar',

        data() {
            return {

                showMobileMenu: false
            }
        },


    }
</script>
<style scoped>

</style>