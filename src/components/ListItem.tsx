import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Breed} from '../context/DogBreedProvider';

const ListItem = ({item, onPress}: {item: Breed; onPress: () => void}) => {
  return (
    <TouchableOpacity
      key={item.name}
      onPress={onPress}
      style={{
        backgroundColor: 'white',
        padding: 16,
        margin: 8,
        borderRadius: 8,
        elevation: 5,
        flexDirection: 'row',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}>
      <View style={{flex: 1}}>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 16}}>{`${item.name
            .charAt(0)
            .toUpperCase()}${item.name.slice(1)}`}</Text>
        </View>
        {item.subbreeds?.length > 0 && (
          <View style={{paddingTop: 16}}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>Subbreeds:</Text>
            </View>
            {item.subbreeds.map(subbreed => (
              <View key={subbreed} style={{paddingTop: 8}}>
                <Text>{subbreed}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
