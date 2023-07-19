# 初始bug

+ vue-i18n导入失败

  需要到文件中去掉导入路径中的`index`，文件包括：
  + ./src/layout/aside/Aside.vue
  + ./src/layout/aside/Menu.vue
  + ./src/layout/header/Menu.vue
  + ./src/layout/header/partials/UserMenu.vue
  + ./src/core/plugins/i18n.ts 