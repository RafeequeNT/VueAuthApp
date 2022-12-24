export const isAuthenticatedUser=()=>{
    let token = localStorage.getItem("token");


    if(token){
        return true
    }else{
            return false
        }
}
export const getAccessToken=()=>{
    let token = localStorage.getItem("token");
return token;
}

export const getHeaderInfo = async function () {
    const token = await getAccessToken();
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  };