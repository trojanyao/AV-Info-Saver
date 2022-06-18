export function refineActress(av) {
    av.actress = av.actress.map(a => {
        // 先剔除头尾空格
        let newA = a.trim()
        if (!newA.match(/[a-zA-Z]+/g)) {
            // 仅作用于非英文演员、非素人演员：剔除内部空格
            if (!av.actressRealName) {
                newA = newA.replaceAll(/\s/g, '')
            }
        }
        return newA
    })
    console.log('去空格后的演员列表', av.actress)
    av.actress = av.actress.join(' ')
    return av
}