<!--父组件中引入子组件-->
<template>
    <div>
        <a href="javascript:;" @click="$store.state.show = true">点击</a>
        <t-dialog></t-dialog>
    </div>
</template>

<script>
import dialog from './dialog-children'

export default {
    component: {

    }
}
</script>