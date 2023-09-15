import React, { useState } from 'react'
import { SafeAreaView, Text } from 'react-native'

const MyFirstComponent = () => {
    const [userName, setUserName] = useState('')
  return (
    <SafeAreaView>
        <Text>My First Component</Text>
        <Text>(Laura Carolina Candamil Cortés)</Text>
    </SafeAreaView>
  )
}

export default MyFirstComponent
