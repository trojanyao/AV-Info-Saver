import { datify } from './datify';
import { codify } from './codify';
const DIGIT_TYPE = [
    'vol',
    'Vol',
    'Case',
    'FILE',
]

// 拼接最后文件名
export async function final(avObj) {
    // 深拷贝
    let av = JSON.parse(JSON.stringify(avObj))
    let finalName;
    console.log('传入的 AV 对象', av)
    if (av.code) {
        // ---------- 日本作品，有番号 ----------
        // ***** 处理演员列表 *****
        {
            av.actress = av.actress.map(a => {
                // 先剔除头尾空格
                let newA = a.trim()
                if (!newA.match(/[a-zA-Z]+/g)) {
                    // 仅作用于非英文演员名：剔除内部空格
                    newA = newA.replaceAll(/\s/g, '')
                }
                return newA
            })
            console.log('去空格后的演员列表', av.actress)
            av.actress = av.actress.join(' ')
        }

        // ***** 处理标题 *****
        {
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
        }

        if (av && av.seriesName) {
            // ***** 系列作品 *****
            av.seriesName = av.seriesName.trim()

            /* 包含编号：检测作品名是否包含编号 */
            // 是否包含编号标识
            let hasIndicator = DIGIT_TYPE.findIndex(d => av.workName.includes(d))
            console.log('编号标识数组位置', hasIndicator)
            // 标识类型
            let indicator = DIGIT_TYPE[hasIndicator]
            // 是否包含纯数字
            let hasDigit = /^(\W+\s*)\d+/.test(av.workName)
            console.log('是否有纯数字', hasDigit)

            let hasNum = (hasIndicator !== -1) || hasDigit
            console.log('作品名是否包含编号', hasNum)

            /* 不含编号：检测作品名前缀（空格之前的内容）和系列名的关系 */
            let workPrefix = av.workName?.match(/^(\S+)\s+([\S\s]+)/)
            console.log('作品名前缀', workPrefix[1])
            // 判断作品名前缀和系列名之间的关系
            // 作品名包含系列名
            let workHasSeries = workPrefix[0] ? workPrefix[1].trim().replaceAll(' ', '').includes(av.seriesName) : false
            console.log('作品名前缀中包含系列名', workHasSeries)
            // 系列名是否包含作品名
            let seriesHasWork = av.seriesName.includes(workPrefix[1]?.trim().replaceAll(' ', ''))
            console.log('系列名中包含作品名前缀', seriesHasWork)
            /* 作品名前缀包含系列名，或系列名包含作品名前缀，说明作品名包含系列名 */


            if (hasNum) {
                // ----- 作品名包含系列名（含编号）-----
                // 格式：系列名（日期）编号 演员名（）作品名剩余部分

                // 标识符和编号部分
                let digitTypeA = av.workName.match(new RegExp(indicator + '[\\S\\s]*\\d+$'))?.[0]
                console.log('标识符和编号部分', digitTypeA)
                // 纯数字部分
                let digitTypeB = av.workName.match(/\d+/)?.[0]
                console.log('纯数字部分', digitTypeB)

                // 编号部分
                let num = digitTypeA ?? digitTypeB
                console.log('编号部分', num)

                // 为了名称简单，不再显示剩余部分
                // let suffix = av.workName.match(new RegExp(num + '\\s*([\\S\\s]+)$'))?.[1]
                finalName = `${av.seriesName}（${datify(av.date)}）${num}（${av.code}）${av.actress}`
                console.log('有编号的作品剩余部分', finalName)
            } else if (workHasSeries || seriesHasWork) {
                // ----- 作品名包含系列名（不含编号）-----
                // 格式：系列名（日期）演员名（番号）作品名剩余部分

                // 剩余部分 = 作品名剔除前缀
                let suffix = workPrefix?.[2]
                finalName = `${av.seriesName}（${datify(av.date)}）${av.actress}（${av.code}）${suffix}`
            } else {
                // --- 作品名不含系列名 ---
                // 格式：系列名（日期）演员名（番号）作品名剩余部分

                // 剩余部分 = 原始作品名
                let suffix = av.workName
                finalName = `${av.seriesName}（${datify(av.date)}）${av.actress}（${av.code}）${suffix}`
            }
        } else {
            // *** 单体作品 ***
            //（日期）演员（番号）作品名
            finalName = `（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName}`
            console.log('单体作品', finalName)
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