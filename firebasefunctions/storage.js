import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { storage } from './firebase'; // Import your Firebase storage instance

const Storage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await storage.ref('images/example.jpg').getDownloadURL();
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image from storage:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <View>
      {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default Storage;
