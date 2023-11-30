
export async function  valdateToken () {

    const token = localStorage.getItem('x-token')
    //console.log(token)
    if(!token){
        return {ok:false}
    }
    const data = await fetch('/api/auth/check', {
      method: 'POST',
      body: JSON.stringify({
        token: token
      })
    })

    const res = await data.json();
    console.log('resValidate: ',res)
    localStorage.setItem('x-token', res.newToken)
    return res
}

