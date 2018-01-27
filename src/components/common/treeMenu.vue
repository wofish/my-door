<template>
  <li class="sidebar-name" v-show="model.auth">
    <span @click="toggle">
      <i :class="['icon','sidebar-name', (isFolder || isDynamicFolder) ? folderIcon : 'file-text']" ></i>
      {{ model.name }}
    </span>
    <ul v-if="isOpen">
      <tree-menu v-for="item in model.children" :key="item.id" :model="item"></tree-menu>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'treeMenu',
  props: {
    model: Object
  },
  data () {
    return {
      folderIcon: 'folder',
      isDynamicFolder: false,
      isOpen: false
    };
  },
  computed: {
    isFolder () {
      return !!(this.model.children && this.model.children.length);
    }
  },
  watch: {
    isDynamicFolder () {
      this.isOpen = true;
      this.folderIcon = 'folder-open';
    }
  },
  methods: {
    toggle () {
      const menuData = this.model;
      if (this.isFolder || this.isDynamicFolder) {
        this.isOpen = !this.isOpen;
        this.folderIcon = this.isOpen ? 'folder-open' : 'folder';
      } else {
          alert('not folder' + menuData.menuName);
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    ul
        list-style: none;
    i.icon
      display inline-block
      width 15px
      height 15px
      background-repeat no-repeat
      vertical-align middle

    .icon.folder
        background-image url(../../common/images/tree/folder.png)
    .icon.folder-open
        background-image url(../../common/images/tree/folder-open.png)

    .icon.file-text
        background-image url(../../common/images/tree/file-text.png)

    .tree-menu li
        line-height 1.5
        cursor pointer
</style>
