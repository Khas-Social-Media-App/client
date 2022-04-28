import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    container: {
        flex:1,
        alignSelf: 'center',
        padding:10,
        justifyContent: 'center',
    },
    bottomContainer:{
        backgroundColor: '#e6ddc5',
        borderRadius: 15,
    },
    pc:{
        alignSelf: 'center',
        height: 200,
        width: 300
    },
    button: {
        alignSelf: "center",
        backgroundColor: "#171515",
        padding: 10,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent:'center',
        marginBottom: 15
    },
    logo: {
        marginTop:10
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    githubImage:{
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight: 5,   
    },
    text: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
    },
    blueText: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: "bold",
        color: '#4287f5',
        marginBottom: 30
    }
})

export default styles;