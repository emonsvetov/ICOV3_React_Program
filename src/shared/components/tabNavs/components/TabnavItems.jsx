

export const getTabnavItems = (program, leaderboardCount) => {

  const TAB_ITEMS = [
    // { title: "my_rewards", icon: "MyRewards", to: `/participant/my-points` },
  ];

  if( !program ) return TAB_ITEMS

  if(program.uses_peer2peer
      > 0){
    TAB_ITEMS.push({
      title: "peer_to_peer",
      icon: "PeerToPeer",
      to: "/participant/peer-to-peer",
    },)
  }

  if(program.uses_leaderboards > 0 && leaderboardCount > 0 ){
    TAB_ITEMS.push({
      title: "leaderboards",
      icon: "Leaderboards",
      to: "/participant/leaderboards",
    })
  }

  if(program.uses_goal_tracker > 0){
    TAB_ITEMS.push({
      title: "my_goals",
      icon: "MyGoals",
      to: "/participant/my-goals",
    },)
  }

  return TAB_ITEMS;

}