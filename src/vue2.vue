<template src="./vue2.html"></template>

<script>
import competitionApi from "./competitionApi";
export default {
  data() {
    return {
      // 赛事
      currentMatch: "", //当前赛事
      competitionList: [], //赛事信息
      sliceCompe: 20, //赛事信息保留数
      // 赛程
      scheduleList: "", //赛程信息
      currentWeekId: "", //当前周赛事id
      // 进度
      eventProcess: [], //赛事进度
    };
  },
  mounted() {
    this.getCompetitionList();
  },
  methods: {
    // 赛事信息
    async getCompetitionList() {
      let res = await competitionApi.getCompetitionList();
      this.competitionList = res.data.list;
      this.currentMatch = res.data.current_tournament.tournamentID;
      this.getScheduleList();
    },
    // 更多赛事信息
    showMoreCompet() {
      this.sliceCompe = this.sliceCompe > 20 ? 20 : this.competitionList.length;
    },
    // 切换赛事
    switchCurrentMatch(item) {
      this.currentMatch = item.tournamentID;
      this.getScheduleList();
    },

    // 赛程信息
    async getScheduleList() {
      let res = await competitionApi.getScheduleList(this.currentMatch);
      this.scheduleList = res[0];
      let currentWeek = this.scheduleList.round_son.find(
        (item) => item.is_now_week === "1"
      );
      this.currentWeekId = currentWeek.id;
      this.getEventProcess();
    },
    // 切换比赛周
    switchEventWeek(item) {
      this.currentWeekId = item.id;
      this.getEventProcess();
    },

    // 对应周赛事进度
    async getEventProcess() {
      let res = await competitionApi.getEventProcess(this.currentWeekId);
      this.eventProcess = res;
    },
  },
};
</script>
