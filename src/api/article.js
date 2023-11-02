import axios from '@/api/axios'

/**
 * 获取文章列表
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postArticleList = async function(data) {
  return axios.post('/article/list-page', data)
}

/**
 * 获取文章详情
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postArticleDetail = async function(data) {
  return axios.post('/article/detail', data)
}

/**
 * 删除文章
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const postArticleDelete = async function(data) {
  return axios.post('/article/delete', data)
}
