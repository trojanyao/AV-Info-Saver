import { datify } from './datify';
import { codify } from './codify';

// 拼接最后文件名
export async function final(av) {
    let finalName;
    console.log('传入的 AV 对象', av)

    // 处理标题（头尾去空格）
    av.workName = av.workName.trim()
    // replace(':', '-')

    if (av.code) {
        // 日本作品，有番号
        // 处理演员列表（拼接）
        av.actress.map(a => {
            a = a.trim().replace(' ', '')
        })
        av.actress = av.actress.join(' ')

        if (av && av.seriesName) {
            if (av.workName.replace(av.seriesName, '').length !== 0) {
                finalName = `【${av.makerName}】${av.seriesName}（${datify(av.date)}）${av.workName.replace(av.seriesName, '').trim()}（${codify(av.code)}）${av.actress}.jpg`
            } else if (av.workName.replace(av.seriesName, '').length === 0) {
                finalName = `【${av.makerName}】${av.seriesName}（${datify(av.date)}）${av.actress}（${codify(av.code)}）.jpg`
            }
        } else {
            finalName = `【${av.makerName}】（${datify(av.date)}）${av.actress}（${codify(av.code)}）${av.workName}.jpg`;
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