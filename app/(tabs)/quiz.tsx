import React, { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import useRandomPokemon from '@/hooks/useRandomPokemon';
import { ActivityIndicator, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeHighScore = async (value: number) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('highScore', jsonValue);
  } catch (e) {
    console.error("Error storing high score:", e);
  }
};

const readHighScore = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('highScore');
    return jsonValue != null ? JSON.parse(jsonValue) : 0;
  } catch (e) {
    console.error("Error reading high score:", e);
    return 0;
  }
};

const Quiz = () => {
  const { loading, data, getRandomPokemon } = useRandomPokemon();
  const [inputValue, setInputValue] = useState('');
  const [streak, setStreak] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [unkownText, setUnknownText] = useState<string>("I don't know");

  useEffect(() => {
    const fetchHighScore = async () => {
      const storedHighScore = await readHighScore();
      setHighScore(storedHighScore);
    };
    fetchHighScore();
  }, []);

  const handleCheckAnswer = () => {
    if (data?.name.toLowerCase() === inputValue.toLowerCase()) {
      setInputValue('');
      setStreak(prevStreak => prevStreak + 1);
      getRandomPokemon();
    }
  };

  const countDown = (count: number) => {
    setUnknownText(count.toString());
    if (count === 0) {
      setStreak(0);
      getRandomPokemon();
      setInputValue('');
      setUnknownText("I don't know");
    } else {
      setTimeout(() => countDown(count - 1), 1000);
    }
  };

  const handleUnknown = () => {
    countDown(3);
    setInputValue(data.name);
  };

  useEffect(() => {
    if (data && inputValue && unkownText === "I don't know") {
      handleCheckAnswer();
    }
  }, [inputValue]);

  useEffect(() => {
    if (streak > highScore) {
      setHighScore(streak);
      storeHighScore(streak);
    }
  }, [streak]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title} type="title">Who is that Pokémon?</ThemedText>
      {loading && <ActivityIndicator />}
      {!loading && data && (
        <>
          <Image 
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png` }} 
            style={styles.image}
          />
          <ThemedText type="subtitle">Current Streak: {streak}</ThemedText>
          <ThemedText type="subtitle">Highscore: {highScore}</ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder="Enter Pokémon name"
            value={inputValue}
            onChangeText={setInputValue}
            editable={unkownText === "I don't know"}
          />
          <ThemedView style={styles.buttonContainer}>
            <Button color='#0a7ea4' title={unkownText} disabled={unkownText !== "I don't know"} onPress={handleUnknown} />
          </ThemedView>
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
    marginTop: 70,
  },
  image: {
    width: undefined,
    height: '60%', 
    aspectRatio: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginTop: 50,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: 300,
    marginBottom: 100,
  }
};

export default Quiz;
