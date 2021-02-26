<template>
<div>
<AppLayout>
    <Dbcontent></Dbcontent>
</AppLayout>
</div>
</template>

<script>
import AppLayout from '~/components/AppLayout'
import Dbcontent from '~/components/Dbcontent'

export default {
    name: 'db',
    components: {
        AppLayout,
        Dbcontent
    }
}
</script>

<style>

</style>