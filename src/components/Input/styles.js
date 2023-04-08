import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    
  },
  inputView: {
    marginTop: 8,
    borderRadius: 60,
    marginHorizontal: 32,
    marginVertical: 10,
  },
  textInput: {
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 16,
  },
  input: {
    fontSize: 14,
    paddingLeft: 16,
    padding: 5,
    width: '100%',
    backgroundColor: '#ececec',
    borderRadius: 30,
    height: height * 0.06,
  },
});
export default styles;
