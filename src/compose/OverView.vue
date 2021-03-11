<template>
    <div class="flex overview column">
        这是总页面
    </div>
</template>

<script>
export default {
    name: 'OverView',
    methods: {
        directToPage(type) {
            this.$router.push({ path: type === 'system' ? `${type}/users` : type });
        }
    }
};
</script>

<style lang="less">
.overview {
    .backgroundGif('/background/ocean');

    background-size: 100%;
    .container(100%, 100%);
}

.showRow {
    justify-content: space-between;
    align-self: center;
    width: 40vw;
    margin: 20px 0;
}
</style>
