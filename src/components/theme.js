import {createMuiTheme} from '@material-ui/core/styles';


const theme = createMuiTheme({
    styles: {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignSelf: 'stretch',
            marginTop: 100,
            height: 200,
            paddingLeft: '20%',
            paddingRight: '20%'
        },
        btn: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        }
    }
});


  export default theme;
