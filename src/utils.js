import crypto from 'crypto';

/**
 * 获取md5加密参数
 * @export
 * @param {any} param 需要加密的内容
 * @returns 加密后的内容
 */
export function getMd5(param) {
  if (!param) return null;
  const md5 = crypto.createHash('md5');
  md5.update(param);
  return md5.digest('hex');
}

export const a = 'b';
