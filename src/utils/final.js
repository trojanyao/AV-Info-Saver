import { datify } from './datify';
import { codify } from './codify';
const DIGIT_TYPE = [
    'vol',
    'Vol',
    'Case',
    'FILE',
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
        console.log('头尾演员名', startAct.test(av.workName))
        if (startAct.test(av.workName) || endAct.test(av.workName)) {
            console.log('替换')
            av.workName = av.workName.replace(av.actress, '')
        }
        // 头尾去空格
        av.workName = av.workName.trim()
        console.log('标题', av.workName)
        av.seriesName = av.seriesName.trim()

        if (av && av.seriesName) {
            // *** 系列作品 ***

            // --- 检查作品名是否包含编号 ---
            // 是否包含编号标识
            let hasIndicator = DIGIT_TYPE.findIndex(d => av.workName.includes(d))
            let indicator = DIGIT_TYPE[hasIndicator]
            console.log('编号标识数组位置', hasIndicator)
            // 是否包含纯数字编号
            let hasDigit = av.workName.match(/^(\W+\s*)\d+/)
            let hasNum = hasIndicator !== -1 || hasDigit
            console.log('作品名是否包含编号', hasNum)

            // 提取作品名中的系列名前缀、剩余部分
            let workPrefix, suffix
            if (hasNum) {
                if (hasIndicator !== -1) {
                    // 作品名包含编号标识，提取标识之前的内容
                    let indicatorIndex = av.workName.indexOf(indicator)
                    console.log('编号标识起始位置', indicatorIndex)
                    workPrefix = av.workName.slice(0, indicatorIndex)
                } else if (hasDigit[0]) {
                    // 作品名包含纯数字，提取纯数字之前的内容
                    workPrefix = hasDigit[1]
                }
            }
            console.log('作品名前缀', workPrefix)

            // 判断作品名和系列名之间的关系
            // 作品名包含系列名
            let workHasSeries = workPrefix.trim().replaceAll(' ', '').includes(av.seriesName)
            console.log('作品名前缀中包含系列名', workHasSeries)
            // 系列名是否包含作品名
            let seriesHasWork = av.seriesName.includes(workPrefix.trim().replaceAll(' ', ''))
            console.log('系列名中包含作品名前缀', seriesHasWork)


            if (workHasSeries || seriesHasWork) {
                // 作品名包含系列名
                console.log('作品名', av.workName, '系列名', av.seriesName)
                let suffix = av.workName.replace(workPrefix, '')
                console.log('剩余部分', suffix)

                // 标识符和编号部分
                let digitTypeA = suffix.match(new RegExp(indicator + '[\\S\\s]*\\d+$'))?.[0]
                console.log('标识符和编号部分', digitTypeA)
                // 纯数字部分
                let digitTypeB = suffix.match(/^\d+/)?.[0]
                console.log('纯数字部分', digitTypeB)

                let realDigit = digitTypeA ?? digitTypeB
                console.log('编号部分', realDigit)

                if (digitTypeA) {
                    suffix = suffix.replace(digitTypeA, '').trim()
                } else if (digitTypeB) {
                    suffix = suffix.replace(digitTypeB, '').trim()
                }
                console.log('剩余部分', suffix.length)

                if (realDigit && suffix.length > 0) {
                    // 作品名中包含编号 && 有剩余部分：编号 演员名（番号）剩余部分
                    finalName = `${realDigit}${av.actress.length > 0 ? ` ${av.actress}` : ''}（${codify(av.code)}）${suffix}`
                    console.log('作品名中包含编号 && 有剩余部分', finalName)
                } else if (realDigit && suffix.length <= 0) {
                    // 作品名中包含编号 && 无剩余部分：编号（番号）演员名
                    finalName = `${realDigit}（${codify(av.code)}）${av.actress}`
                } else {
                    // 作品名中不含编号：演员名（番号）剩余部分
                    finalName = `${av.actress}（${codify(av.code)}）${av.workName.replace(av.seriesName, '').trim()}`
                }
            } else if (!av.workName.includes(av.seriesName.trim())) {
                // 作品名不含系列名
                finalName = `${av.actress}（${codify(av.code)}）`
            }
            // 系列名（日期）
            finalName = `${av.seriesName}（${datify(av.date)}）${finalName}`
        } else {
            // *** 单体作品 ***
            //（日期）演员（番号）作品名
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