import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';
import Colors from '../constants/colors';

const TaskInput = props => {
    const [enteredTask, setEnteredTask] = useState('');

    const taskInputHandler = (enteredText) => {
        setEnteredTask(enteredText);
    };

    const addTaskHandler = () => {
        props.onAddTask(enteredTask);
        setEnteredTask('');
    };

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Input Task"
                    style={styles.input}
                    onChangeText={taskInputHandler}
                    value={enteredTask}
                    autoFocus={true}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="ADD" color={Colors.primary} onPress={addTaskHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button title="CANCEL" color={Colors.accent} onPress={props.onCancel}/>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.base
    },
    input: {
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        color: Colors.primary,
        padding: 10,
        width: '80%',
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    button: {
        width: '40%'
    }
});

export default TaskInput;