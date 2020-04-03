import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function todoHeader() {
  return (
      <View style={styles.container}>
          <Text style={styles.headerText}>Todo App</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        backgroundColor: '#2e2eb8'
    },
    headerText: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold'
    }
})