import store from 'store';

const settingKey = 'vue-admin-starter-' + 'setting';

// initial state
const state = {
  sidebarCollapse: store.get(settingKey) ? !!store.get(settingKey).sidebarCollapse : false,
};

// getters
const getters = {
  sidebarCollapse: state => state.sidebarCollapse,
};

// actions
const actions = {
  ['toggleSideBar']({ commit }) {
    commit('TOGGLE_SIDEBAR_COLLAPSE');
  },
};

// mutations
const mutations = {
  ['TOGGLE_SIDEBAR_COLLAPSE'](state) {
    state.sidebarCollapse = !state.sidebarCollapse;
    store.set(settingKey, state);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
