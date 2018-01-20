import * as types from '../mutation-types';

// initial state
const state = {
    chosenApplyNos: []
};

// getters
const getters = {
    findApplyNos: state => state.chosenApplyNos
};

// actions
const actions = {
    chooseApply({ commit }, applyNos) {
        commit(types.CHOOSE_APPLY, {applyNos});
    }
};

// mutations
const mutations = {
    [types.CHOOSE_APPLY] (state, { applyNos }) {
        state.chosenApplyNos = applyNos;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
