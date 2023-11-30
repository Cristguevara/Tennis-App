
export async function  valdateToken () {

    const token = localStorage.getItem('x-token')
    //console.log(token)
    if(!token){
        return {ok:false}
    }
    const data = await fetch('/api/auth/check', {
      headers: {
        token: token
      }
    })

    const res = await data.json();
    localStorage.setItem('x-token', res.newToken)
    return res
}

