import React, { useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedTextInput';
import { ThemedTextInput } from '@/components/ThemedText';
import useRandomPokemon from '@/hooks/useRandomPokemon';
import { ActivityIndicator, Image } from 'react-native';

const Quiz = () => {
  const { loading, data, getRandomPokemon } = useRandomPokemon();
  const [inputValue, setInputValue] = useState('');

  const handleCheckAnswer = () => {
    if (data.name.toLowerCase() === inputValue.toLowerCase()) {
      setInputValue('');
      getRandomPokemon();
    } else {
      console.log('Try again');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} type="title">Who is that Pokémon?</ThemedText>
      {loading && <ActivityIndicator />}
      {!loading && data && (
        <>
          <Image 
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png` }} 
            style={styles.image}
          />
          <ThemedTextInput
            style={styles.input}
            placeholder="Enter Pokémon name"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleCheckAnswer}
          />
        </>
      )}
    </ThemedView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 50,
  },
  image: {
    width: undefined,
    height: '60%', 
    aspectRatio: 1,
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 60,
    paddingHorizontal: 10,
  },
};

export default Quiz;
