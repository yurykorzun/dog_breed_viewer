import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList, SafeAreaView} from 'react-native';
import {Breed, useDogBreed} from '../context/DogBreedProvider';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';
import ListItem from '../components/ListItem';

const HomeScreen = () => {
  const {navigate} = useNavigation<any>();
  const [search, setSearch] = useState('');
  const {breeds, filteredBreeds, isLoading, fetchDogBreeds, filterBreeds} =
    useDogBreed();

  const renderItem = ({item}: {item: Breed}) => {
    return (
      <ListItem
        key={item.name}
        item={item}
        onPress={() => navigate('BreedDetail', {item})}
      />
    );
  };

  const onTextChange = (text: string) => {
    setSearch(text);
    filterBreeds(text);
  };

  useEffect(() => {
    fetchDogBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO extract styles into stylesheet
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{}}>
        <View style={{padding: 6}}>
          <Text style={{fontSize: 16}}>Filter by breed name</Text>
        </View>
        <TextInput
          value={search}
          onChangeText={onTextChange}
          placeholder="Search breed"
          style={{borderWidth: 1, borderColor: 'black', height: 40}}
        />
      </View>
      {isLoading ? (
        <View style={{}}>
          <Loader />
        </View>
      ) : breeds?.length ? (
        <View style={{flex: 1, paddingTop: 8}}>
          <FlatList
            data={filteredBreeds}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Breed Available</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
