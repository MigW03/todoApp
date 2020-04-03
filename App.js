import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, FlatList, StatusBar } from 'react-native';

import Header from './components/Header'
import TodoItem from './components/TodoItem'


export default function todoApp() {
  const [list, setList] = useState([])
  const [inputData, setInputData] = useState('')

  function addItem(index){
    Keyboard.dismiss()
    
    let newItem = {
      name: inputData,
      key: index.toString()
    }

    setList((prevList) => {
      return[
        newItem,
        ...prevList
      ]
    })

    setInputData('')
  }

  function deleteItem(key){
    setList((prevList) => {
      let oldList = prevList.slice()
      return oldList.splice(key, 1)
    })

    alert(JSON.stringify(list))
  }

  return (
    <>
      <StatusBar backgroundColor='#2e2eb8' />
      <Header />
      <View style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent = {() => 
            <View style={{height: 100, backgroundColor: '#FFF'}} />
          }
          renderItem={({item, index}) => 
            <TodoItem
              title={item.name}
              onPress={() => deleteItem(item.key)}
            />
          }
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder='Nova tarefa'
            value={inputData}
            onChangeText={text => setInputData(text)}
          />
          <TouchableOpacity style={styles.touch} onPress={addItem}>
            <Text style={styles.touchText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#FFF'
  },
  inputArea: {
    flexDirection: 'row',
    width: '93%',
    height: 50,
    backgroundColor: '#2e2eb8',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 8,
    paddingRight: 0,
    margin: 12,
    position: 'absolute',
    bottom: 5,
    borderRadius: 10
  },
  input: {
    width: '85%',
    padding: 6,
    paddingLeft: 14,
    borderRadius: 8,
    fontSize: 18,
    backgroundColor: '#FFF'
  },
  touch: {
    flex: 1,
    backgroundColor: '#2e2eb8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  }
})
