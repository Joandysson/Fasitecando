import {
    Theme,
    createStyles
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: 10,
            marginBottom: 5,
            paddingTop: 0,
            paddingBottom: 0,
            background: '#333',
            borderRadius: 5
        },
        table: {
            minWidth: 650,
        },
        button: {
            margin: '20px 0',
            // marginBottom: '10px'
        },
        buttonDialog: {
            margin: '20px 0',
            float:'right'
        },
        small: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        tableContainer: {
            textAlign: 'center',
            fontSize: '18px'
        },
        root: {
            '& > *': {
                margin: theme.spacing(0),
                width: '100%',
            },
        },
        loadMore: {
            margin:'4px auto',
            color:'#FFF',
            padding: '0 28px',
            background: '#505050'
        }
    }),
);

export default useStyles;