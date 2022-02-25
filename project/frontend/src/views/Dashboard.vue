<template>
<div class="row">
    <div class="col-md-4 text-white">
        <AlertsView></AlertsView>
    </div>
    <div class="col-md-8">
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

<style>

</style>