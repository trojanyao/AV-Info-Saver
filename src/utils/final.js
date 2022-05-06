import { datify } from './datify';
import { codify } from './codify';
const DIGIT_TYPE = [
    'vol',
    'Vol',
]

// 拼接最后文件名
export async function final(av) {
    let finalName;
    console.log('传入的 AV 对象', av)
    if (av.code) {
        // ---------- 日本作品，有番号 ----------
        // ***** 处理演员列表 *****
        av.actress = av.actress.map(a => {
            if (!a.trim().match(/[a-zA-Z]+/g)) {
                // 仅处理日本演员名称中的空格
                return a.replaceAll(/\s/g, '').trim()
            }
        })
        console.log('去空格后的演员列表', av.actress)
        av.actress = av.actress.join(' ')

        // ***** 处理标题 *****
        // 去头尾演员名
        let startAct = new RegExp('^' + av.actress, 'g')
        let endAct = new RegExp(av.actress + '$', 'g')
        console.log('头尾演员名', endAct.test(av.workName))
        if (startAct.test(av.workName) || endAct.test(av.workName)) {
            console.log('替换')
            av.workName = av.workName.replace(av.actress, '')
        }
        // 头尾去空格
        av.workName = av.workName.trim()
        console.log('标题', av.workName)

        if (av && av.seriesName) {
            // *** 系列作品 ***
            if (av.workName.includes(av.seriesName.trim())) {
                // 作品名包含数字编号或纯数字
                let hasDigit = DIGIT_TYPE.find(d => av.workName.includes(d)) || av.workName.match(/\d+$/g)
                console.log('作品名是否包含数字编号', hasDigit)
                // 作品名包含系列名
                if (hasDigit) {
                    // 作品名中包含数字编号
                    finalName = `${av.workName.replace(av.seriesName, '').trim()}（${codify(av.code)}）${av.actress}`
                } else {
                    finalName = `${av.actress}（${codify(av.code)}）${av.workName.replace(av.seriesName, '').trim()}`
                }
            } else if (!av.workName.includes(av.seriesName.trim())) {
                // 作品名不含系列名
                finalName = `${av.actress}（${codify(av.code)}）`
            }
            finalName = `${av.seriesName}（${datify(av.date)}）${finalName}`
        } else {
            // *** 单体作品 ***
            finalName = `（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName}`
        }

        finalName = `【${av.makerName}】${finalName}${av.duration ? (av.resolution ? ` [${av.duration}; ${av.resolution}]` : ` [${av.duration}]`) : ''}.jpg`
    } else {
        // ---------- 欧美作品，无番号 ----------
        // 替换半角冒号
        av.workName = av.workName.replace(': ', '-')
        let newActress = []
        for (let a of av.actress) {
            await newActress.push(a.toLowerCase().replace(/\b(\w)|\s(\w)/g, s => s.toUpperCase()))
        }

        console.log('修改后的演员列表', newActress)

        finalName = `【${av.makerName}】${av.seriesName || ''}（${datify(av.date)}）${newActress.join(', ')} - ${av.workName}${av.duration ? `[${av.duration}; ${av.resolution.join(', ')}]` : ''}.jpg`
    }
    console.log('最后拼接的文件名', finalName)

    return finalName
}