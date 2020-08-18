import React, { useState } from 'react';
import { StyleSheet, Button, View, FlatList, AsyncStorage } from 'react-native';
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
    // saveTasks();
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
    if (dateList.includes(date.substring(0,10))) {
      return null;
    } else {
      dateList.push(date.substring(0,10));
      return date;
    }
  }

  // const saveTasks = async () => {
  //   try {
  //     await AsyncStorage.setItem('tasks', tasks);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const fetchTasks = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('tasks');
  //     if (value !== null) {
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <View style={styles.screen}>
      <Header title="Task Tracker" />
      <View style={styles.content}>
        <Button title="Add New Task" onPress={() => setIsAddMode(true)} color={Colors.primary} />
        <FlatList
          extraData={this.state}
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
