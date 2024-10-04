import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { StyleSheet, Button } from 'react-native';
import PokeBall from '@/assets/images/poke-ball.svg';


export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title' style={styles.title}>Pokemon Guess Native</ThemedText>
      <PokeBall style={styles.background} />
      <ThemedView style={styles.buttonContainer}>
        <Button color='#0a7ea4' title="Play" onPress={() => router.push('/quiz')}/>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 100
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: 50,
    justifyContent: 'center'
  },
  buttonContainer: {
    marginBottom: 100,
    width: 100
  }
});
