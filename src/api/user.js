/*
* @file: 用户登录、注册相关接口
* @author: VunboYao
* time: 2023-09-20 08:18:39
*/

import axios from '@/api/axios'

/**
 * 登录
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postLogin = async(data) => {
  return axios.post('/login', data)
}
