import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 1),
  },
  totalVote: {
    paddingBottom: "40px",
  },
  cardGrid: {
    padding: "20px 0px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    paddingLeft: "10px",
  },
}));
export default useStyles;
