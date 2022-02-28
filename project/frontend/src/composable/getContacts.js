import { ref } from 'vue'

const getContacts = () => {

  const contacts = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      let data = await fetch('http://localhost:8887/contacts')
      if(!data.ok) {
        throw Error('no available data')
      }
      contacts.value = await data.json()
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { contacts, error, load  }
}


export default getContacts