import {
  Box,
  Button,
  Divider,
  Input,
  makeStyles,
  Paper,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    maxWidth: 480,
    margin: 'auto',
    padding: theme.spacing(2),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    fontWeight: 600,
  },
  inputContainer: {
    paddingTop: 0,
    '& > div': {
      marginBottom: 8,
    },
  },
}))
export default function RegisterUser() {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <div>
      <Paper className={classes.paperContainer} variant="outlined">
        <Typography variant="h3" className={classes.title}>
          User Registration
        </Typography>
        <Divider />
        <Box className={classes.inputContainer}>
          <div>
            <Typography variant="body1">Name</Typography>
            <TextField fullWidth size="small" variant="outlined" />
          </div>

          <div>
            <Typography variant="body1">Email</Typography>
            <TextField fullWidth size="small" variant="outlined" />
          </div>

          <div>
            <Typography variant="body1">Password</Typography>
            <TextField fullWidth size="small" variant="outlined" />
          </div>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </div>
  )
}
