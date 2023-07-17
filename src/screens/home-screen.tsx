import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    ListRenderItem
} from 'react-native';
import colors from '../constants/colors';

type todoModel = {
    id: number,
    title: string
}
const todos: Array<todoModel> = [
    { id: 1, title: 'First Item' },
    { id: 2, title: 'Second Item' },
    { id: 3, title: 'Third Item' },
    { id: 4, title: 'Fourth Item' },
]

const HomeScreen = () => {
    const ListItem: ListRenderItem<todoModel> = ({ item }) => {
        return (
            <TouchableOpacity style={styles.listItem}>
                <View style={styles.textWrapper}>
                    <View style={styles.circle}></View>
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
                <TouchableOpacity>
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
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>ADD</Text>
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
        paddingHorizontal: 10,
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