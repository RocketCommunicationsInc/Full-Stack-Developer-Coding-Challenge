import { ref } from 'vue'

const getAlerts = () => {

  const alerts = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      let data = await fetch('http://localhost:8000/alerts')
      if(!data.ok) {
        throw Error('no available data')
      }
      alerts.value = await data.json()
    }
    catch(err) {
      error.value = err.message
    }
  }

  return { alerts, error, load }
}

export default getAlerts