<template>
<div class="row justify-content-center">
    <div class="col-lg-5">
        <h3>Alerts</h3>
        <AlertsView></AlertsView>
    </div>
    <div class="col-lg-5">
        <h3>Contacts</h3>
        <ContactsView></ContactsView>
    </div>
</div>
</template>

<script>
import AlertsView from './AlertsView.vue'
import ContactsView from './ContactsView.vue'

export default {
    name: "Dashbaord",
    components: {
        AlertsView,
        ContactsView
    },
    setup(){
        
    }

}
</script>

<style scoped>
h3{
    color: white;
}
</style>
