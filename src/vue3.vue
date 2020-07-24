<template src="./vue3.html"></template>

<script>
import competitionApi from "./competitionApi";
import { reactive, onMounted } from "vue";
export default {
  setup() {
    // 赛事
    let _competition = () => {
      let competition = reactive({
        competitionList: "", //赛事信息
        currentMatch: "", //当前选择赛事
        sliceCompe: 20, //赛事列表数量
      });
      // 赛事信息
      let _getCompetitionList = async () => {
        let res = await competitionApi.getCompetitionList();
        competition.competitionList = res.data.list;
        competition.currentMatch = res.data.current_tournament.tournamentID;
        _getScheduleList(competition.currentMatch);
      };
      // 更多
      let _showMoreCompet = () => {
        competition.sliceCompe =
          competition.sliceCompe > 20 ? 20 : competition.competitionList.length;
      };
      // 切换赛事
      let _switchCurrentMatch = (item) => {
        competition.currentMatch = item.tournamentID;
        _getScheduleList(competition.currentMatch);
      };
      onMounted(() => {
        _getCompetitionList();
      });
      return { competition, _showMoreCompet, _switchCurrentMatch };
    };

    // 赛程
    let _schedule = () => {
      let schedule = reactive({
        scheduleList: "", //赛程信息
        currentWeekId: "", //当前赛程周id
      });
      // 赛程信息
      let _getScheduleList = async (id) => {
        let res = await competitionApi.getScheduleList(id);
        schedule.scheduleList = res[0];
        let currentWeek = schedule.scheduleList.round_son.find(
          (item) => item.is_now_week === "1"
        );
        schedule.currentWeekId = currentWeek.id;
        _getEventProcess(schedule.currentWeekId);
      };
      // 切换赛程周
      let _switchEventWeek = (item) => {
        schedule.currentWeekId = item.id;
        _getEventProcess(schedule.currentWeekId);
      };
      return { schedule, _getScheduleList, _switchEventWeek };
    };
    
    // 进度
    let _process = () => {
      let process = reactive({
        eventProcess: "", //赛事进度
      });
      // 赛事进度
      let _getEventProcess = async (id) => {
        let res = await competitionApi.getEventProcess(id);
        process.eventProcess = res;
      };
      return { process, _getEventProcess };
    };

    let { competition, _showMoreCompet, _switchCurrentMatch } = _competition();
    let { schedule, _getScheduleList, _switchEventWeek } = _schedule();
    let { process, _getEventProcess } = _process();
    return {
      // 赛事
      competition,
      _showMoreCompet,
      _switchCurrentMatch,
      // 赛程
      schedule,
      _switchEventWeek,
      // 进度
      process,
    };
  },
};
</script>
