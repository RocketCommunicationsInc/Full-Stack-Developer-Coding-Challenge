import { ref } from 'vue'

    const formatTimeString = (value) => {
        const addZero = (value) => {
            if(value < 10)
              return "0" + value
            else 
              return value
          }
      
        let temp = new Date(value)
        let result = temp.getHours() + ':' + 
            addZero(temp.getMinutes()) + ':' + 
            addZero(temp.getSeconds())
        
        return result
    }
export default formatTimeString