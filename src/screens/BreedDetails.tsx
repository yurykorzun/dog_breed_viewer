import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {useDogBreed} from '../context/DogBreedProvider';

const BreedDetailsScreen = ({route}: {route: any}) => {
  const {item} = route.params;
  const {loadBreedImage, loadSubbreedImage, breedInfo, subBreedInfo} =
    useDogBreed();

  useEffect(() => {
    if (item.subbreeds?.length > 0) {
      loadSubbreedImage(item.name, item.subbreeds);
    }
    loadBreedImage(item.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO extract styles into stylesheet
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingTop: 8,
        }}>
        <View
          style={{
            flex: 1,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: 'white',
            borderRadius: 8,
            paddingBottom: 16,
          }}>
          <View style={{alignItems: 'center', paddingTop: 16}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{`${item.name
              .charAt(0)
              .toUpperCase()}${item.name.slice(1)}`}</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8,
            }}>
            {breedInfo[item.name] ? (
              <Image
                source={{uri: breedInfo[item.name]}}
                style={{width: 80, height: 80}}
              />
            ) : (
              <View
                style={{
                  height: 80,
                  width: 80,
                  backgroundColor: 'lightgrey',
                  borderRadius: 8,
                }}
              />
            )}
          </View>
          {item.subbreeds?.length > 0 && (
            <View
              style={{
                paddingTop: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  Subbreeds:
                </Text>
              </View>
              {item.subbreeds.map((subbreed: string) => (
                <View
                  key={subbreed}
                  style={{
                    paddingTop: 8,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View style={{paddingRight: 8}}>
                    {subBreedInfo[item.name]?.[subbreed] ? (
                      <Image
                        source={{uri: subBreedInfo[item.name][subbreed]}}
                        style={{width: 50, height: 50, borderRadius: 30}}
                      />
                    ) : (
                      <View
                        style={{
                          height: 50,
                          width: 50,
                          backgroundColor: 'lightgrey',
                          borderRadius: 8,
                        }}
                      />
                    )}
                  </View>

                  <Text style={{fontSize: 16}}>{subbreed}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BreedDetailsScreen;
