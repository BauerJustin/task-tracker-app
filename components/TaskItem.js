import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import moment from 'moment';

const TaskItem = props => {

    const [date, setDate] = useState();

    if (date == null && props.date != null){
        setDate(<Text style={styles.date}>{"  " + moment(props.date).format('dddd MMM Do')}</Text>);
    }

    return (
        <View>
            {date}
            <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.key)}>
                <View style={styles.listItem} >
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.time}>{moment(props.time).format('LT')}</Text>
                </View>
            </TouchableOpacity>
        </View>

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
            width: 350,
            flexDirection: 'row'
        },
        title: {
            color: Colors.base,
            fontSize: 18,
            flex: 1,
            justifyContent: 'flex-start'
        },
        date: {
            color: Colors.primary,
            fontSize: 18,
        },
        time: {
            color: Colors.base,
            fontSize: 18,
            justifyContent: 'flex-end'
        }
    }
);

export default TaskItem;