import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const TaskItem = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.key)}>
            <View style={styles.listItem} >
               <Text>{props.title}</Text>
               <Text>{props.date}</Text>
          </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create(
    {
        listItem: {
            padding: 10,
            backgroundColor: Colors.primary,
            borderColor: Colors.accent,
            borderWidth: 1,
            margin: 5,
            width: 350
        },
    }
);

export default TaskItem;