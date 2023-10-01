
<template>
    <div class="p-1" v-for="Tap in taps" :key="Tap.id">
        <Tap :tapTitle=Tap.title :programCode="Tap.code"/>
    </div>
</template>

<script>

import Tap from "@/components/Tab.vue"
export default {
    name: "TapRow",
    data() {
        return {
            taps: [
                {id: 1, title: 'tap1', code: 'main()'},
                {id: 2, title: 'tap2', code: 'int'},
                {id: 3, title: 'tap3', code: 'string'}
            ]
        }
    },
    components: {
        Tap
    }
};
</script>
