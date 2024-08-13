import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const ExampleFlatList = () => {
    // Example data with sufficient items for scrolling
    const data = Array.from({ length: 30 }, (_, i) => ({ id: i.toString(), text: `Item ${i}` }));

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text style={styles.title}>The Receipt Vault</Text>
            </View>

            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>{item.text}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#6200ea',
        padding: 16,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    container: {
        flex: 1, // Ensures the FlatList takes up available space
        backgroundColor: 'white',
    },
    item: {
        height: 60, // Adjust height for better visibility
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ExampleFlatList;
