import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, FlatList, StatusBar} from 'react-native';

import Header from './components/Header'
import TodoItem from './components/TodoItem'

export default function todoApp() {
  const [list, setList] = useState([
    {name: 'teste', key: '0'}
  ]) //Creates the list state, wich starts either with the savedList or an empty Array
  const [inputData, setInputData] = useState('') // creates the TextInput state

  function addItem(){
    Keyboard.dismiss()

    if(inputData.length > 0){
      random = Math.random().toString()
    
      //New object that will be puhed to the 'list' array
      let newItem = {
        name: inputData,
        key: inputData + random
      }

      //push newItem to the top of previous array
      setList((prevList) => {
        return[
          newItem,
          ...prevList
        ]
      })
    }
    else{
      alert('Por favor, digite algo!!')
    }

    setInputData('')
  }

  function deleteItem(key){
    let newList = list.filter(item => item.key !== key)

    setList(newList)
  }

  return (
    <>
      <StatusBar backgroundColor='#2e2eb8' />
      <Header />
      <View style={styles.container}>
        <FlatList
          data={list}
          // keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent = {() => 
            <View style={{height: 100, backgroundColor: '#FFF'}} />
          }
          renderItem={({item, index}) => 
              <TodoItem
                title={item.name}
                key = {index}
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


//Styling the components
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
