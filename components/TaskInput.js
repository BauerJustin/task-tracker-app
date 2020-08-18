import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '../constants/colors';
import moment from 'moment';

const TaskInput = props => {
    const [enteredTask, setEnteredTask] = useState('');
    const [date, setDate] = useState(new Date());

    const taskInputHandler = (enteredText) => {
        setEnteredTask(enteredText);
    };

    const addTaskHandler = () => {
        props.onAddTask([enteredTask, moment(date).format()]);
        setEnteredTask('');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
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
                <View style={styles.datePicker}>
                {true && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='datetime'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    textColor={Colors.primary}
                    minimumDate={new Date(Date.now())}
                    minuteInterval={15}
                    />
                )}
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="ADD" color={Colors.primary} onPress={addTaskHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button title="CANCEL" color={Colors.accent} onPress={props.onCancel} />
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
    },
    datePicker: {
        width: '100%'
    }
});

export default TaskInput;