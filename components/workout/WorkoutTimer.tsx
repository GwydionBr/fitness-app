import { StyleSheet,  View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { formatTimerSeconds } from '@/utils/timeHelper'
import { useThemeStore } from '@/stores/ThemeStore'

const WorkoutTimer = ({seconds} : {seconds: number}) => {
  const formatedTime = formatTimerSeconds(seconds)
  const {theme} = useThemeStore()

  return (
    <View className={`${theme === 'light' ? 'bg-blue-400' : 'bg-blue-800'} rounded-md p-3 m-2 absolute top-5 z-10`}> 
      <ThemedText style={styles.text}>{formatedTime}</ThemedText>
    </View>
  )
}

export default WorkoutTimer

const styles = StyleSheet.create({
  container: {
    width: 150,
    backgroundColor: 'rgba(123, 235, 255, 0.94)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    top: 10,
    shadowColor: '#000',
    zIndex: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})