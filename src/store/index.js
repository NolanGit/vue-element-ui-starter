// 组装并导出 store

import Vue from 'vue';
import Vuex from 'vuex';
import setting from './modules/setting';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    setting,
  },
  strict: process.env.NODE_ENV !== 'production',
});
