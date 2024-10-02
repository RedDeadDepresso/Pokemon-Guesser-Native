import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Button } from 'react-native';

export default function HomeScreen() {
  const pokeBall = require('@/assets/images/ball.svg');
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ImageBackground source={pokeBall} resizeMode="contain" style={styles.background}>
      </ImageBackground>
      <Button title="Play" onPress={() => router.push('/quiz')}/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
