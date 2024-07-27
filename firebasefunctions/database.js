import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { database } from './firebase'; // Import your Firebase database instance

const Database = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await database.ref('example').once('value');
        setData(snapshot.val());
      } catch (error) {
        console.error('Error fetching data from database:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Data from Firebase Database:</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default Database;
