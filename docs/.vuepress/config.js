module.exports = {
  title: 'artiely',
  description: '人生除了眼前的苟且，还有未知的bug和看不懂的code',
  port: '8088',
  themeConfig: {
    repo: 'artiely/antd-admin',
    repoLabel: '查看源码',
    docsBranch: 'master',
    editLinks: true,
    label: '简体中文',
    selectText: '选择语言',
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '基础组件',
          collapsable: false,
          children: ['','one'],
        },
      ],
      '/': [
        ''
      ]
      
    },
  },
}
