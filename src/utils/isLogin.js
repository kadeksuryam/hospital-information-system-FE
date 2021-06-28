const isLogin = () => {
    const token = localStorage.getItem('JWT_token')
    const authUserID = localStorage.getItem('authUserID')
    const userType = localStorage.getItem('userType')
  
    if(token && authUserID && userType){
      return true
    }
    return false
}

module.exports = {
    isLogin
}