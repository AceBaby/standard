<template>
    <div id="app">
        <div class="basic" v-if="showHeaderTopFlag">
           上部
        </div>
        <div class="flex flex1" style="width: 100%;">
            <div class="flex1 routerView">
                <router-view :key="$route.fullPath" v-if="isRouterAlive"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'App',
    computed: {
        ...mapGetters({
            showHeaderTopFlag: 'getShowHeaderTopFlag'
        })
    },
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true
        };
    },
    methods: {
        reload() {
            // 数据加载前router-view不可见。防止数据加载一半的情况
            this.isRouterAlive = false;
            // 数据请求加载完成后，调用如下方法，router-view内容使这个可见，防止页面刷新遭成的闪烁
            this.$nextTick(() => (this.isRouterAlive = true));
        }
    }
};
</script>

<style lang='scss'>
#app {
    display: flex;
    flex-flow: row;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
}

.basic {
    width: 100%;
    height: 10vh;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
}

.routerView {
    display: flex;
    flex-flow: column;
    overflow-y: auto;
}
</style>
