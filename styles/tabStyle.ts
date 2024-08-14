import calendar from "@/app/(tabs)/calendar";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    calendar_text_container:{
        alignItems:'center',
        marginTop: 25,
        marginBottom: 10
    },
    calendar_text:{
        fontFamily:'Inter',
        fontSize:30
    },
    calendar_container: {
        marginLeft: 20,
        marginRight: 20,
        shadowColor: '#171717',
        borderRadius: 8,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    calendar: {
        height: 300,
        borderRadius: 8
    },
    dayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      },
      dayText: {
        fontSize: 24,
        lineHeight: 30,
        textAlign: 'center',
      },
      current_date_container:{
        marginTop: 5,
        marginLeft:20,
        flexDirection:'row'
      },
      date_container:{
        height: 100,
        width: 120,
        justifyContent: 'center',
        alignItems:'center',
      },
      date:{
        fontFamily: 'Inter',
        fontSize: 25
      },
      date_title:{
        fontFamily: 'Inter',
        fontSize: 15,
      },
      total_event_container: {
        justifyContent:'center',
        marginLeft: 7
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
      show_event_container:{
        marginLeft:30,
        marginRight:30,
      },
      event_list_container:{
        borderWidth: 1,
        borderColor: 'black',
        height:70,
        width:'100%',
        borderRadius: 10,
        marginBottom:10
      },
      time:{
        marginLeft: 20,
        paddingTop:5
      },
      event_name:{
        alignItems:'center',
        marginTop:5
      },
      time_text:{
        fontFamily:'Inter',
        fontSize:15
      },
      event_text:{
        fontFamily:'Inter',
        fontSize:20
      },
      //Event Page
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      monthText: {
        fontSize: 24,
        marginHorizontal: 10,
      },
      schedule_list_container:{
        marginTop:10,
        marginLeft: 20,
        marginRight:20,
        marginBottom:10,
      },
      schedult_list:{
        height: 70,
        width: '100%',
        flexDirection:'row'
      },
      event_date_container:{
        backgroundColor:'#A2D2FF',
        height:'100%',
        width: 80,
        alignItems:'center',
        justifyContent:'center',
      },
      event_date_container1:{
        backgroundColor:'#5CEFE5',
        height:'100%',
        width: 80,
        alignItems:'center',
        justifyContent:'center',
      },
      event_date:{
        fontFamily:'Inter-medium',
        fontSize: 20
      },
      event_name_container:{
        borderBottomWidth:1,
        borderRightWidth:1,
        borderTopWidth:1,
        borderColor: 'black',
        width:'75%'
      },
      time_container:{
        width:'auto',
        paddingLeft: 5
      },
      event_time:{
        fontFamily:'Inter-medium',
        fontSize: 15
      },
      event:{
        height:43,
        justifyContent:'center',
        alignItems:'center'
      },
      name_event:{
        fontFamily:'Inter-medium',
        fontSize: 15
      },
      // for pop up modal
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
      },
      button_input:{
        width:'100%'
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
      saveButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#3C93E5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      saveButtonText: {
        color: 'white',
        fontSize: 16,
      },
      errorContainer:{
        width:"100%"
      },
      errorText: {
        color: 'red',
        fontSize: 12,
      },
});

export default styles