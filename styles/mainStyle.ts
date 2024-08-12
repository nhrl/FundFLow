import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#193E53',
        height:100,
        alignItems:'center'
      },
      images: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
      },
      title:{
        color: '#38B6FF',
        fontSize:50,
        fontFamily:'InriaSerif'
      },
      text:{
        color: '#FFFFFF',
        fontSize:42,
        fontFamily: 'Inter',
      },
      desc_container:{
        marginTop: 50
      },
      description:{
        color:'#FFFFFF',
        fontSize:15,
        fontFamily:'InriaSerif-Regular'
      },
      button_container: {
            marginTop: 150
      },
      button: {
        backgroundColor: '#38B6FE',
        width: 275,
        height: 51,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
      },
      button_text: {
        color: 'white',
        fontFamily: 'Inter',
        fontSize: 25
      },

    //Budget Page Style section
    budget_container:{
      backgroundColor: '#FFFFF',
      flex:1,
      margin:45,
      justifyContent:'center',
      alignItems: 'center',
    },
    budget_title_container:{
      width: '90%',
      marginBottom: 5,
    },
    budget_title:  {
      fontFamily: 'Inter',
      fontSize: 18
    },
    input_container:{
      width: '90%',
    },
    peso_sign: {
      position:'absolute',
      left: 6,
      top: 10,
      color: '#7F7979',
      fontSize: 23,
      fontFamily: 'Inter'
    },
    input_box:{
      borderColor: 'black',
      height:50,
      borderRadius: 4,
      borderWidth: 2,
      paddingLeft: 30,
      fontSize: 18
    },
    budget_button_container: {
      width: '90%',
      marginTop: 40,
      justifyContent:'center',
      alignItems:'center'
    },
    budget_button:{
      backgroundColor: '#3C93E5',
      width: "55%",
      height: 51,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center'
    },
    budget_button_text: {
      color: 'white',
      fontFamily: 'Inter',
      fontSize: 20
    },
  });

export default styles;
