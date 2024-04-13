import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

type Props = {
  children: React.ReactNode
}

export default function Paragraph(props: Props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
})
