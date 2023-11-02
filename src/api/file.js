import axios from '@/api/axios/index'

// 上传头像
export const uploadAvatar = async(data) => {
  return axios.post('/file/upload/avatar', data, {
    'content-type': 'multipart/form-data',
  })
}

/**
 * 上传图片列表
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const uploadList = async(data) => {
  return axios.post('/file/upload/list', data, {
    'content-type': 'multipart/form-data',
  })
}
