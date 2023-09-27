
<template>
    <div class="p-1" v-for="Tap in taps" :key="Tap.id">
        <Tap :tapTitle=Tap.title :programCode="Tap.code"/>
    </div>
</template>

<script>

import Tap from "@/components/Tap.vue"
export default {
    name: "TapRow",
    data() {
        return {
            taps: [
                {id: 1, title: 'tap1', code: 'main()'},
                {id: 2, title: 'tap2', code: 'int x'}
            ]
        }
    },
    components: {
        Tap
    }
};
</script>
