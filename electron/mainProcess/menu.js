const { Menu, BrowserWindow } = require('electron')
const path = require('path')
// 构建菜单项
const aboutUs = () => {
  let win = new BrowserWindow(({
    height: '100%',
    width: '100%',
    title: '关于我们'
  }))
  win.loadURL('http://poorguy.me:9999/about')
}
let template = [
  {
    label: '菜单',
    submenu: [
      {
        label: '关于',
        click: aboutUs,
      },
      {
        label: '退出',
        role: 'quit',
      },
    ],
  },
  {
    label: '刷新',
    role: 'reload',
  },
]
let menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)




