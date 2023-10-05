import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 5
  } ,
  cardText: {
    flex: 1, 
    flexWrap: 'wrap' , 
    width: 125, 
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 15,
  } ,
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  }
});
