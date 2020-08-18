import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import Colors from './constants/colors';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  var dateList = [];

  const addTaskHandler = taskAttributes => {
    setTasks(currentTasks => [...currentTasks, { key: Math.random().toString(), value: taskAttributes[0], date: taskAttributes[1] }]);
    setIsAddMode(false);
  };

  const removeTaskHandle = taskKey => {
    setTasks(currentTasks => {
      return currentTasks.filter((task) => task.key !== taskKey);
    });
  };

  const cancelTaskAdditionHandler = () => {
    setIsAddMode(false);
  }

  const checkPreviousDate = date => {
    storeData();
    if (dateList.includes(date.substring(0,10))) {
      return null;
    } else {
      dateList.push(date.substring(0,10));
      return date;
    }
  }

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(tasks)
      await AsyncStorage.setItem('@tasks', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tasks')
      setTasks(JSON.parse(jsonValue));
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View style={styles.screen}>
      <Header title="Task Tracker" />
      <View style={styles.content}>
        <Button title="Add New Task" onPress={() => setIsAddMode(true)} color={Colors.primary} />
        <FlatList
          data={tasks.sort((a, b) => a.date.localeCompare(b.date))}
          renderItem={itemData => <TaskItem onDelete={removeTaskHandle.bind(this, itemData.item.key)} title={itemData.item.value} date={checkPreviousDate(itemData.item.date)} time={itemData.item.date} />}
        />
      </View>
      <TaskInput visible={isAddMode} onAddTask={addTaskHandler} onCancel={cancelTaskAdditionHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.base,
  },
  content: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
