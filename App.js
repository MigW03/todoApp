import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, FlatList, StatusBar, AsyncStorage} from 'react-native';

import Header from './components/Header'
import TodoItem from './components/TodoItem'

var id = 0

//Recover AsynStorage saved Array
var savedList = async() => {
  try{
    return await JSON.parse(AsyncStorage.getItem('todoArray'))
  }catch(err){
    alert('Something went wrong recovering the saved data') // Error => Invariant ilation: Tried to get frame out of range index NaN
}}

export default function todoApp() {
  const [list, setList] = useState(savedList || []) //Creates the list state, wich starts either with the savedList or an empty Array
  const [inputData, setInputData] = useState('') // creates the TextInput state

  //Save the list state on a 'todoArray' key of AsyncStorage
  function saveData(){
    try{
      AsyncStorage.setItem('todoArray', JSON.stringify(list))
    }catch(err){
      alert('Erro ao salvar dados')
    }
  }

  function addItem(){
    id += 1
    key = id.toString()
    Keyboard.dismiss()

    // random = Math.random().toString()
    
    //New object that will be puhed to the 'list' array
    let newItem = {
      name: inputData,
      key: key
      // key: inputData + random
    }

    //push newItem to the top of previous array
    setList((prevList) => {
      return[
        newItem,
        ...prevList
      ]
    })

    setInputData('')
    saveData()
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
