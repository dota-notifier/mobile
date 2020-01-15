import AsyncStorage from '@react-native-community/async-storage'
import messaging from '@react-native-firebase/messaging'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { RNCamera } from 'react-native-camera'

export const DotaNotifier = () => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem('code').then(code => {
      if (code) {
        setCode(code)

        messaging().requestPermission()

        messaging().subscribeToTopic(code)
      }

      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <SafeAreaView style={styles.main}>
        <ActivityIndicator color="#f44336" size="large" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        <Text style={styles.title}>Dota Notifier</Text>
        {!code && (
          <>
            <RNCamera
              style={styles.preview}
              captureAudio={false}
              onBarCodeRead={({ data }) => {
                if (data) {
                  setCode(data)

                  AsyncStorage.setItem('code', data)
                }
              }}
            />
            <Text style={styles.description}>
              Scan the QR code on the desktop app to get started.
            </Text>
          </>
        )}
        {!!code && (
          <>
            <Text style={styles.description}>
              You're all set! Every time Dota 2 comes to the foreground, you'll
              get a push notification.
            </Text>
            <Text style={styles.description}>
              Tip: Keep the app in the background to receieve notifications.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setCode('')

                AsyncStorage.removeItem('code')
              }}>
              <Text style={styles.label}>Sign out</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f44336',
    borderRadius: 5,
    marginTop: 40
  },
  description: {
    color: 'white',
    lineHeight: 22,
    marginTop: 20,
    textAlign: 'center'
  },
  label: {
    color: 'white',
    marginHorizontal: 40,
    marginVertical: 20
  },
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50
  },
  preview: {
    borderRadius: 5,
    height: width - 100,
    marginVertical: 20,
    overflow: 'hidden',
    width: width - 100
  },
  safe: {
    flex: 1
  },
  title: {
    color: '#f44336',
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center'
  }
})
