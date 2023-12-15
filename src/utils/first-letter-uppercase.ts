/**
 * 将句子转换为每个单词首字母大写、其他字母小写的格式
 */

export function firstLetterUppercase(original: string) {
  return original
    ?.split(/\s/)
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    ?.join(' ')
}
