import { View, Text, Button } from 'react-native'
import React from 'react'
import {useRouter, Link} from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:18}}>SignUp Page</Text>
      <Button onPress={() => router.back()} title='Go Back' />
      <Link href={'/(drawer)/(tabs)/myincome'} asChild>
        <Button title='Go to tab Page' />
      </Link>
    </View>

  )
}