
import { ref } from 'vue'

const userRegister = () => {

  const error = ref(null)

  const register = async (firstname, lastname, email, password) => {
    try {
      let data = await fetch("http://localhost:8000/users/register", {
            // Adding method type.
            method: "POST",
            
            // Adding body.
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
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
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { error, register }
}

export default userRegister