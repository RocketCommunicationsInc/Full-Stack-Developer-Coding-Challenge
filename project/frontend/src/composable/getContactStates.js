import { ref } from 'vue'

const getContactStates = () => {

  const states = ref([])
  const error = ref(null)

  const loadStates = async () => {
    try {
      let data = await fetch('https://localhost:8887/contacts/states/count')
      if(!data.ok) {
        throw Error('no available data')
      }
      states.value = await data.json()
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { states, error, loadStates  }
}


export default getContactStates