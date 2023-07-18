import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    ListRenderItem,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

type todoModel = {
    id: string,
    title: string
}

const HomeScreen = () => {// Define states
    const [todos, setTodos] = useState<todoModel[]>([]);
    const [textInput, setTextInput] = useState('');
    const [updateId, setUpdateId] = useState('');

    // Initialize previous data from the storage at the beginning
    useEffect(() => {
        getTodosFromStorage();
    }, []);

    // Update storage data if any change in todo list
    useEffect(() => {
        saveTodoToStorage(todos);
    }, [todos]);

    // Save todo list to storage
    async function saveTodoToStorage(todos: todoModel[]) {
        try {
            const stringifyTodos = JSON.stringify(todos);
            await AsyncStorage.setItem('todos', stringifyTodos);
        } catch (error) {
            console.log(error);
        }
    };

    // Get todo list from storage
    async function getTodosFromStorage() {
        try {
            const todos = await AsyncStorage.getItem('todos');
            if (todos != null) {
                setTodos(JSON.parse(todos));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Add new todo item
    const addTodo = () => {
        // Check if add todo with empty input
        if (textInput == '') {
            Alert.alert('Error', 'Please enter something');
        } else {
            // create new todo object
            const newTodo = {
                id: Math.random().toString(),
                title: textInput,
            };
            // Add new todo in todo list state
            setTodos([...todos, newTodo]);
            setTextInput('');
        }
    };

    // let the user edit an existing todo item
    function editTodo(todo: todoModel) {
        // Set update mode with id
        setUpdateId(todo.id)
        // Set selected todo title visible in input field to edit
        setTextInput(todo.title)
    }
    function updateTodo() {
        // Check if add todo with empty input
        if (textInput == '') {
            Alert.alert('Error', 'Please enter something');
        } else {
            // Find selected todo index from the list
            const foundIndex = todos.findIndex(todo => todo.id == updateId)
            if (foundIndex > -1) {
                // Update todo title using found index
                todos[foundIndex]['title'] = textInput
            }
            // Update list state
            setTodos([...todos]);
            // Clear text input
            setTextInput('');
            // Clear update mode
            setUpdateId('')
        }
    };

    // Remove todo item from the list
    function deleteTodo(todoId: string) {
        const newTodosItem = todos.filter(item => item.id != todoId);
        setTodos(newTodosItem);
        if (todoId === updateId) {
            setUpdateId('');
            setTextInput('');
        }
    };

    const ListItem: ListRenderItem<todoModel> = ({ item }) => {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => editTodo(item)}>
                <View style={styles.textWrapper}>
                    <View style={styles.circle}></View>
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                    <Text style={styles.itemText}>REMOVE</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={styles.header}>
                <Text
                    style={styles.heading}>
                    TODO:
                </Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                data={todos}
                renderItem={ListItem}
            />

            <View style={styles.footer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter here"
                        onChangeText={text => setTextInput(text)}
                        value={textInput}
                    />
                    <TouchableOpacity style={styles.button} onPress={updateId ? updateTodo : addTodo}>
                        <Text style={styles.buttonText}>{updateId ? 'UPDATE' : 'ADD'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.primary,
    },
    listContainer: {
        padding: 10,
        paddingBottom: 100
    },
    listItem: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10,
    },
    textWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: colors.primary
    },
    itemText: {
        fontSize: 13,
        color: colors.gray,
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        elevation: 40,
        backgroundColor: colors.white,
        flex: 1,
        marginVertical: 10,
        borderRadius: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10
    },
    button: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        backgroundColor: colors.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold'
    }
});

export default HomeScreen;