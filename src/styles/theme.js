function isDark() {
  // 主题判断
  let theme

  // user-agent传参确定主题
  let userAgent = navigator.userAgent
  theme = userAgent.includes('Theme/Night') ? 'dark' : 'light'


  // 路径传参确定主题
  const url = new URL(location.href)
  const regex = /[?|&]mode=night/g

  if (regex.test(url.href)) {
    theme = 'dark'
  }

  return theme === 'dark'
}


function addStyle(lists, cssName, isDark) {
  let style = ''

  lists.forEach((value) => {
    let color = isDark ? value.darkColor : value.color
    style += `.${value.className} {${cssName}: ${color}}`
  })

  return style
}

export default function addTheme() {
  const colorList = [
    {
      cssName: '--bg-color',
      'light-theme': '#ffffff',
      'dark-theme': '#272829',
    },
    {
      cssName: '--font-color',
      'light-theme': '#000',
      'dark-theme': '#7f7f7f',
    },
    {
      cssName: '--result-border-color',
      'light-theme': '#f4f4f6',
    },
    {
      cssName: '--result-title-color',
      'light-theme': '#2b69d0'
    },
    {
      cssName: '--tag-item-bg-color',
      'light-theme': '#f2f7fe',
    },
    {
      cssName: '--tag-item-color',
      'light-theme': '#4981d6',
    },
    {
      cssName: '--vice-font-color',
      'light-theme': '#91959b',
    },
    {
      cssName: '--button-bg-color',
      'light-theme': '#f1f2f4',
    },
    {
      cssName: '--button-color',
      'light-theme': '#414549',
    },
    {
      cssName: '--button-vice-color',
      'light-theme': '#aaa',
    },
    {
      cssName: '--button-border-color',
      'light-theme': '#e8e9ea',
    },
  ]

  const themeList = {
    'light-theme': {},
    'dark-theme': {}
  }

  colorList.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'cssName') {
        themeList[key][item.cssName] = item[key];
      }
    })
  })


  let colorStr = ''
  Object.keys(themeList).forEach(key => {
    let main = ``;
    Object.keys(themeList[key]).forEach(cssName => {
      main += `${cssName}:${themeList[key][cssName]};`
    })
    colorStr += `.${key}{${main}}`;
  })


  const styleElement = document.createElement('style')
  styleElement.innerText = colorStr;
  const html = document.querySelector('head');
  html.append(styleElement);
}
