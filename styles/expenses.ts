import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginLeft: 10,
    marginTop:40
  },
  goBackText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    main_container:{
        justifyContent: 'center',
        alignItems:'center',
    },
    money_container:{
        backgroundColor: '#3C93E5',
        height: 170,
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
      marginTop: 10
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
    scroll: {
      marginBottom:5,
      marginTop:5
    },
    list_Container:{
      width: '100%',
      justifyContent:'center',
      alignItems:'center',
      marginTop: 10,
    },
    list_wrapper: {
        width: '90%',
    },
    detail_container: {
        width: '100%',
        borderWidth: 1,
        borderColor:'black',
        height: 60,
        borderRadius: 5
    },
    details: {
        flex: 1,
        justifyContent:'center',
        marginLeft: 10
    },
    text: {
        fontFamily:'Inter-medium',
        fontSize:15
    },
    details2: {
        flex: 1,
        alignItems:'center',
        marginLeft: 10,
        flexDirection:'row'
    },
    money: {
        fontFamily:'Inter',
        fontSize: 18,
        marginLeft: 5
    },
    Event_Empty:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginTop: 20
    },
    add_button_container: {
      position:'absolute',
      height: 70,
      width:70,
      bottom:8,
      right: 15,
      zIndex:1
    },
    add_button:{
      backgroundColor: '#3C93E5',
      height:'100%',
      width:'100%',
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center'
    },
    editModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    editModalContent: {
      width: 300,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
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
    errorContainer:{
      width:"100%"
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
    modalContainer1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent1: {
      width: 300,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
  
  });
  
export default styles;