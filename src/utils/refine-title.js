export function refineTitle(av) {
    // 去头尾演员名
    let startAct = new RegExp('^' + av.actress, 'g')
    let endAct = new RegExp(av.actress + '$', 'g')
    let temp = startAct.test(av.workName) || endAct.test(av.workName)
    console.log('头尾是否包含演员名', temp)
    if (temp) {
        console.log('演员名字符串', av.actress)
        av.workName = av.workName.replace(av.actress, '')
    }
    // 头尾去空格
    av.workName = av.workName.trim()
    console.log('去头尾演员名后的标题', av.workName)
    return av
}