pragma solidity >=0.7.0 <0.9.0;
contract Election {
   
   uint count;
   string _name;
   struct Candidate {
       string name;
       uint Votecount;
       string moto;
   }
   struct Voter{
       bool authorized;
       uint Vote;
       bool Voted;
   }
   address public owner;
   string public ElectionName;
   mapping(address=>Voter) public voters;
   uint public totalVotes;
   Candidate [] public candidates;
   modifier onlyOwner(){
       require(owner==msg.sender);
       _;
   }
   constructor(string memory _name) public{
       owner=msg.sender;
       ElectionName=_name;
       totalVotes=0;
   }
   function AddCandidate(string memory candidateName,string memory _moto) onlyOwner public{
       candidates.push(Candidate(candidateName,0,_moto));
   }
   function getNumCandidate()  public view returns(uint){
       return(candidates.length);
   }
   function authorize(address _voter) onlyOwner public{
       voters[_voter].authorized=true;
   }
   function Vote(uint VoteIndex) public{
       require(!voters[msg.sender].Voted);
       require(voters[msg.sender].authorized);
       voters[msg.sender].Vote=VoteIndex;
       voters[msg.sender].Voted=true;
       candidates[VoteIndex].Votecount+=1;
       totalVotes+=1;
   }
   function getCandidateName () public view returns(Candidate[] memory _candidates){
       return(candidates);
   }
}