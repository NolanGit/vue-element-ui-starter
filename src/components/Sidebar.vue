<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <div class="brand">你好你好你好你好</div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.name"
      :collapse="isCollapse"
      @select="handleSelect"
      background-color="#25314C"
      text-color="#fff"
      active-text-color="#00c1de"
    >
      <sidebar-item :menu="menu"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from '@/components/SidebarItem';
import menu from '../menu';

export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  data() {
    return {
      menu: menu, // 只显示授权访问的菜单
    };
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 导航菜单的点选处理
    handleSelect(index) {
      this.$router.push({ name: index });
    },
  },
};
</script>
