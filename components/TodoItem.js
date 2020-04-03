import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class TodoItem extends React.Component{
    render(){
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.text}>{this.props.title}</Text>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={styles.delete}>Deletar</Text>
                </TouchableOpacity>
            </View>
        );}
}

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 12,
        borderStyle: 'dashed',
        margin: 10,
        padding: 6,
        width: '80%',
        alignSelf: 'center'
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        margin: 4,
        marginLeft: 10
    },
    delete: {
        color: 'red',
        fontSize: 14,
        margin: 6
    }
})
