import service from "./service";

export default {
  //赛事
  getCompetitionList() {
    return service({
      url: "services/api_url.php",
      method: "post",
      params: {
        api_path: "/services/match/tournament_list.php",
        method: "post",
        platform: "web",
        api_version: "9.9.9",
        language_id: 1,
        gameID: 1,
      },
    });
  },
  //赛程
  getScheduleList(id) {
    return service({
      url: `https://img1.famulei.com/tr/${id}.json?_=${new Date().getTime()}`,
      method: "get",
    });
  },
  //赛事进度
  getEventProcess(id) {
    return service({
      url: `https://img1.famulei.com/tr_round/${id}.json?_=${new Date().getTime()}`,
      method: "get",
    });
  },
};
