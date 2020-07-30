import React, { useState } from 'react';
import { StyleSheet, Button, View, FlatList } from 'react-native';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import Colors from './constants/colors';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addTaskHandler = taskTitle => {
    setTasks(currentTasks => [...currentTasks, { key: Math.random().toString(), value: taskTitle }]);
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


  return (
    <View style={styles.screen}>
      <Header title="Task Tracker"/>
      <View style={styles.content}>
        <Button title="Add New Task" onPress={() => setIsAddMode(true)} color={Colors.primary} />
        
        <FlatList 
          data={tasks} 
          renderItem={itemData => <TaskItem onDelete={removeTaskHandle.bind(this, itemData.item.key)} title={itemData.item.value} />}
        />
      </View>
      <TaskInput visible={isAddMode} onAddTask={addTaskHandler} onCancel={cancelTaskAdditionHandler}/>
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
