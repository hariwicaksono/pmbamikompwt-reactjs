import Axios from 'axios'

const RoothPath = "http://localhost/pmbamikompwt-server/api/"

const GET = (path) => {
    const promise = new Promise((resolve,reject)=>{
        Axios.get(RoothPath+path).then(res=>{
            resolve(res.data.data)
        },err=>{
            reject(err)
        })
    })
    return promise
}

const GET_ID = (path,id) => {
    const promise = new Promise((resolve,reject)=>{
        Axios.get(RoothPath+path+id).then(res=>{
            resolve(res.data.data[0])
        },err=>{
            reject(err)
        })
    })
    return promise
}

const LOGIN = (path,data) => {
    const promise = new Promise((resolve,reject)=>{
        Axios.post(RoothPath+path,data).then(res=>{
            resolve(res.data)
        },err=>{
            reject(err)
        })
    })
    return promise
}

const PUTUSER = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.put(RoothPath+path,data).then(res=>{
             resolve(res.data)
         },err=>{
             reject(err)
         })
    })
    return promise
 }

const POSTUSER = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.post(RoothPath+path,data).then(res=>{
             resolve(res.data)
         },err=>{
             reject(err)
         })
    })
    return promise
 }

const POSTSOAL = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.post(RoothPath+path,data).then(res=>{
             resolve(res.data)
         },err=>{
             reject(err)
         })
    })
    return promise
 }

 const PUTSOAL = (path,data) =>{
    const promise = new Promise((resolve,reject)=>{
         Axios.put(RoothPath+path,data).then(res=>{
             resolve(res.data)
         },err=>{
             reject(err)
         })
    })
    return promise
 }
 
 const Delete = (path,id) => {
    const promise = new Promise((resolve,reject) => {
        Axios.delete(RoothPath+path+id).then(res =>{
            resolve(res.data.status)
        },(err)=>{
            reject(err)
        })
    })
    return promise
}

const POSTIMAGE = (path,data,name) => {
    const promise = new Promise((resolve,reject)=>{
        const formdata = new FormData()
        formdata.append('foto',data,name)
        Axios.post(RoothPath+path,formdata).then(res=>{
           resolve(res.data.status)
       },(err)=>{
           reject(err)
       })
    })
    return promise
}

const GET_ID_VAL = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        Axios.get(RoothPath+path+data).then(res => {
            resolve(res.data.data)
        }).catch(er => {
            reject(er)
        })
    })
    return promise
}


const GetPageId = (data) => GET_ID('PageController?id=',data)
const GetSoal = () => GET('SoalController')
const GetSoalId = (data) => GET_ID('SoalController?id=',data)
const PostSoal = (data) => POSTSOAL('SoalController',data)
const PutSoal = (data) => PUTSOAL('SoalController',data);
const DeleteSoal = (id) => Delete('SoalController/index_delete?id=',id)
const PostLogin = (data) => LOGIN('LoginController',data)
const PostUser = (data) => POSTUSER('UserController',data)
const GetUserId = (data) => GET_ID('UserController?id=',data)
const DeleteUser = (id) => Delete('UserController/index_delete?id=',id)
const PutUser = (data) => PUTUSER('UserController',data)
const CariOrang = (data) => GET_ID_VAL('SearchController?id=',data)
const PostImageP = (data,name) => POSTIMAGE('ImageUpload',data,name)
const PutUserPassword = (data) => PUTUSER('UserPassword',data)

const API = {
    GetPageId,
    GetSoal,
    GetSoalId,
    PostSoal,
    PutSoal,
    DeleteSoal,
    PostLogin,
    PostUser,
    GetUserId,
    DeleteUser,
    PutUser,
    CariOrang,
    PostImageP,
    PutUserPassword
    
}

export default API