import types from '../types';
const state = {
    checkedKeys: [],
    showHeaderTopFlag: false
};
const actions = {
};
const getters = {
    getCheckedKeys: (state) => {
        return state.checkedKeys;
    },
    getShowHeaderTopFlag: (state) => {
        return state.showHeaderTopFlag;
    }
};
const mutations = {
    [types.SELECT_TREE_KEYS](state, key) {
        state.checkedKeys[0] = key;
    },
    [types.CHANGE_HEADER_TOP_FLAG](state, flag) {
        state.showHeaderTopFlag = flag;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
