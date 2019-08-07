import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FilledButtons from './FilledButtons';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 500,
    margin: "auto",
    textAlign: "start",
    padding: theme.spacing(3, 2),
  },
  flexConatiner: {
    minHeight: "100vh"
  },
  btnsRow: {
    padding: theme.spacing(0, 0),
  },
  descr: {
    color: "#566573",
    fontSize: 14
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Ticet({ 
  firstFilled, 
  secondFilled, 
  onClick, 
  isChecked,
  isCheckedTwo,
  isTicedWon,
  getResult,
  gameOver
}) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  function handleButtonClick() {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        getResult()
      }, 2000);
    }
  }

  return (
    <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.flexConatiner}
      >
      <Paper className={classes.root}>
        <Typography variant="h6">Билет</Typography>
        <div className={classes.btnsRow} >
        <Typography component="p">Выбери 8 чисел</Typography>
        <Typography className={classes.descr} component="p"><span>{isChecked}</span> из <span>19</span> </Typography>

          {firstFilled.map((number) => 
            <FilledButtons 
            key={1-number.number}
            filledId={"1"}
            number={number.number}  
            onClick={onClick}
            selected={number.selected}
            />
          )}

        </div>
        <div className={classes.btnsRow} >
        <Typography component="p">Выбери 1</Typography>
        <Typography className={classes.descr} component="p"><span>{isCheckedTwo}</span> из <span>2</span> </Typography>
          
          {secondFilled.map(number => 
            <FilledButtons 
            key={2-number.number}
            filledId={"2"}
            number={number.number} 
            onClick={onClick}
            selected={number.selected}
            />
          )}

        </div>
        {
          (gameOver) ? 
          <Typography component="p">
            {(isTicedWon)? "Ты выиграл :)" : "Ты проиграл :( попробуй еще раз"}
          </Typography> : <Typography component="p">Mожете играть</Typography>
        }  
        <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleButtonClick}
        >
          Показать результат
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      </Paper>
    </Grid>
  );
}
