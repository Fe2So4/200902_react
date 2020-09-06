import ajax from './ajax'
const BASE = ''
// export function reqLogin() {
//     ajax('/login',{username,password},'POST')
// }
export const reqLogin = (username,password)=>ajax(BASE + '/login',{username,password},'POST')

export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',user, 'POST');

// 获取一级 二级分类
export const reqCategory = (parentId) => ajax(BASE + '/manage/category/list', { parentId})
export const reqAddCategory = (categoryName,parentId) => ajax(BASE + '/manage/category/add', {categoryName ,parentId},'POST')
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName},'POST')

// 获取商品分类列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {pageNum,pageSize})