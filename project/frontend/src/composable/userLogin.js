
import { ref } from 'vue'

const userLogin = () => {

  const error = ref(null)

  const login = async (email, password) => {
    try {
      let data = await fetch("http://localhost:8000/users/login", {
            // Adding method type.
            method: "POST",
            
            // Adding body.
            body: JSON.stringify({
                email: email,
                password: password
            }),
            
            // Adding headers to the request.
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

      if(!data.ok) {
        if(data.status != 200){
          let errorData = await data.json()
          throw Error(errorData.detail)
        }
        else
          throw Error('Failed to register user.')
      }
      
      return data.json()
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { error, login }
}

export default userLogin