import "./App.css";
import Web3 from "web3";
import { useEffect, useState } from "react";
import FaceIcon from "@material-ui/icons/Face";
import {
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import useStyles from "./styles";
import ABI from "./utils/ABI";

function App() {
  const classes = useStyles();
  const [Vote, setVote] = useState(0);
  const [Add, setAdd] = useState(1);
  const [Candidates, setCandidate] = useState([]);
  const [ElectionName, setElectionName] = useState([]);
  const [TotalVotes, setTotalVotes] = useState(0);
  const AddVote = async (index) => {
    console.log(index);
    var web3 = new Web3("http://localhost:8545");

    const res = web3.eth.getAccounts().then(async (accounts) => {
      const Token = new web3.eth.Contract(
        ABI,
        "0xDaEc13dD4d8308FAa7DAE869CbE8d3c67BA89969"
      );
      try {
        const result = await Token.methods
          .Vote(index)
          .send({ from: accounts[0] });
        setAdd(Add + 1);
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    });
  };
  useEffect(() => {
    const getElectionDetails = () => {
      var web3 = new Web3("http://localhost:8545");
      const res = web3.eth.getAccounts().then(async () => {
        const Token = new web3.eth.Contract(
          ABI,
          "0xDaEc13dD4d8308FAa7DAE869CbE8d3c67BA89969"
        );
        const list = await Token.methods.getCandidateName().call();
        console.log(list);
        const ElectionName = await Token.methods.ElectionName().call();
        console.log(ElectionName);

        setElectionName(ElectionName);
        const totalvotes = await Token.methods.totalVotes().call();
        setTotalVotes(totalvotes);
        setCandidate(list);
      });
    };
    getElectionDetails();
    // getCandidateList();
  }, [Add]);
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h5">{ElectionName}</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.container}>
          <Container maxWidth="sm">
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              color="textPrimary"
            >
              Welcome to Election's
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Voting is by a secret ballot. Displaying your ballot or discussing
              your vote or another person's votes is prohibited. Only eligible
              electors are permitted in the voting place and they must leave
              immediately after voting.
            </Typography>
          </Container>
        </div>
        <div>
          <Container maxWidth="md" className={classes.cardGrid}>
            <Typography
              align="center"
              variant="h3"
              color="textSecondary"
              gutterBottom
              className={classes.totalVote}
            >
              Total Vote Count : {TotalVotes}
            </Typography>

            <Grid container spacing={4}>
              {Candidates.map((candidate, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={6}>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="h4" gutterBottom>
                          {candidate.name}
                          <FaceIcon className={classes.icon} />
                        </Typography>

                        <Typography variant="h5" color="textSecondary">
                          {candidate.moto}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="medium"
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            AddVote(index);
                          }}
                        >
                          Vote
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
}

export default App;
