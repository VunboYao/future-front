/*
* @file: 标签管理相关接口
* @author: VunboYao
* time: 2023-09-21 09:04:27
*/
import axios from '@/api/axios'

/**
 * 创建标签
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postCreateLabel = async(data) => {
  return axios.post('/label/create', data)
}

/**
 * 获取标签列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postLabelList = async(data = {}) => {
  return axios.post('/label/list', data)
}
