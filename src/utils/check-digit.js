// 检测是否包含纯数字
export function checkDigit(workName, seriesName) {
	// 有纯数字编号也肯定是在标题中的系列名后跟着纯数字，所以先提取出后面跟着纯数字的子字符串的多种可能
	let matches = workName.matchAll(/\s*(?<substr>\S+)\d+/g)
	let subStrs = []
	for (let match of matches) {
		let substr = match.groups.substr.replace(/\d/g, '')
		console.log('子字符串可能', substr, /^\s*$/.test(substr))
		// 排除空字符串
		if (!/^\s*$/.test(substr)) {
			subStrs.push(substr)
		}
	}
	console.log('########## 后面有数字的子字符串 ##########', subStrs)

	// 然后和系列名比对，查找出真正和系列名相关的子字符串
	let trueStr = subStrs.filter(substr => substr.includes(seriesName) || seriesName.includes(substr))
	console.log('真正的子串', trueStr)
	if (trueStr.length > 0) {
		// 符合条件的字串数 > 0：包含纯数字
		// 查找纯数字
		let num = workName.match(new RegExp(trueStr[0] + '\\s*(\\d+)'))?.[1]
		console.log('纯数字编号', num)
		return num
	} else {
		// 符合条件的字串数 <= 0：不包含纯数字
		return undefined
	}
}