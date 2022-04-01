import { datify } from './datify';
import { codify } from './codify';

// 拼接最后文件名
export async function final(av) {
    let finalName;
    console.log('传入的 AV 对象', av)

    // ***** 处理标题 *****
    // 去末尾演员名
    let endAct = new RegExp(av.actress[0] + '$', 'g')
    if (endAct.test(av.workName)) {
        av.workName = av.workName.replace(av.actress[0], '')
    }
    // 头尾去空格
    av.workName = av.workName.trim()

    if (av.code) {
        // 日本作品，有番号
        // 处理演员列表（拼接）
        av.actress.map(a => {
            a = a.trim().replace(' ', '')
        })
        av.actress = av.actress.join(' ')

        if (av && av.seriesName) {
            // *** 系列作品 ***
            if (av.workName.includes(av.seriesName.trim())) {
                // 作品名包含系列名
                finalName = `【${av.makerName}】${av.seriesName}（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName.replace(av.seriesName, '').trim()}${av.duration ? ` [${av.duration}]` : ``}.jpg`
            } else if (!av.workName.includes(av.seriesName.trim())) {
                // 作品名不含系列名
                finalName = `【${av.makerName}】${av.seriesName}（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.duration ? `[${av.duration}]` : ``}.jpg`
            }
        } else {
            // *** 单体作品 ***
            finalName = `【${av.makerName}】（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName}${av.duration ? ` [${av.duration}]` : ``}.jpg`
        }
    } else {
        // 欧美作品，无番号
        let newActress = []
        for (let a of av.actress) {
            await newActress.push(a.toLowerCase().replace(/\b(\w)|\s(\w)/g, s => s.toUpperCase()))
        }

        console.log('修改后的演员列表', newActress)

        finalName = `【${av.makerName}】${av.seriesName || ''}（${datify(av.date)}）${newActress.join(', ')} - ${av.workName} [${av.duration}; ${av.resolution.join(', ')}].jpg`
    }
    console.log('最后拼接的文件名', finalName);

    return finalName
}