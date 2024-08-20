import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    main_container:{
        justifyContent: 'center',
        alignItems:'center',
    },
    money_container:{
        backgroundColor: '#3C93E5',
        height: 160,
        marginTop: 50,
        width: '90%',
        borderRadius: 10
    },
    balance_container:{
      flexDirection:'row',
      justifyContent: 'space-between',
      paddingTop: 15,
      paddingLeft: 16,
      paddingRight: 18
    },
    balance:{
      fontSize: 16,
      fontFamily:'Inter-medium',
      color: 'white'
    },
    button_cash: {
      width: 100,
      height: 30,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 5
    },
    add_cash_text:{
      color: '#3C93E5',
      fontFamily: 'Inter-medium',
      paddingLeft: 7,
    },
    current_balance:{
      alignItems:'center',
      marginTop: 15
    },
    amount_balance:{
      color: 'white',
      fontFamily:'Inter-semi',
      fontSize: 32,
    },
    total_amount_container:{
      flexDirection: 'row',
      marginLeft: 12,
      marginTop: 14
    },
    budget_title:{
      color: 'white',
      fontFamily: 'Inter-medium',
      fontSize: 16
    },
    amount_budget:{
      color: 'white',
      fontFamily: 'Inter-semi',
      fontSize: 16
    },
    container: {
      marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      monthText: {
        fontSize: 20,
        marginHorizontal: 10,
        paddingLeft: 70,
        paddingRight: 70
      },
      expenses_title_container:{
        marginTop: 18,
        marginBottom: 18,
        marginLeft: 22
      },
      expenses_title:{
        fontFamily: 'Inter-semi',
        fontSize: 18
      },
      expneses_list_container:{
        marginLeft: 22,
        marginRight: 22,
        marginBottom: 10
      },
      list_container:{
        width: '100%',
        height: 70,
        backgroundColor: '#A2D2FF',
        borderRadius: 4,
        flexDirection:'row'
      },
      list_container2:{
        width: '100%',
        height: 70,
        backgroundColor: '#5CEFE5',
        borderRadius: 4,
        flexDirection:'row'
      },
      info_container:{
        flex:2,
        paddingLeft: 10
      },
      amount_container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      budget_text:{
        fontFamily: 'Inter-semi',
        fontSize: 18
      },
      event_info: {
        fontFamily: 'Inter-semi',
        fontSize: 15
      },
      info_wrapper:{
        flex: 1,
        justifyContent:'center'
      },
      emptyEvent: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 20
      },
      //Modal
      addCashModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      addCashContent: {
        width: 300,
        height: 300,
        justifyContent:'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
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
      input_container:{
        width: '100%',
        marginBottom: 20
      },
      button: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#3C93E5',
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
      cancelButton: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
      },
      cancelButtonText: {
        color: '#333',
        fontSize: 18,
      },
});

export default styles;