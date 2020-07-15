<template>
  <div class="home">
    <!-- 赛事信息 -->
    <div class="competitions">
      <div
        class="competitions-item"
        v-for="(item, ind) in competitionList.slice(0, sliceCompe)"
        :key="ind"
        @click="switchCurrentMatch(item)"
      >
        <img :src="item.image_thumb" alt />
        <span :class="item.tournamentID === currentMatch ? 'active-match' : ''">{{ item.name }}</span>
      </div>
      <div @click="_showMoreCompet" class="competitions-item">{{ sliceCompe > 20 ? "收起" : "更多赛事信息" }}</div>
    </div>
    <!-- 赛程信息 -->
    <div class="schedule">
      <!-- <div class="schedule-weeks">
        <span
          @click="switchEventWeek(item)"
          :class="currentWeekId === item.id ? 'active-match' : ''"
          v-for="(item, ind) in scheduleList.round_son"
          :key="ind"
        >{{ item.name }}</span>
      </div>-->
      <!-- 赛事进度 -->
      <!-- <div class="schedule-process">
        <div class="item" v-for="(item, ind) in eventProcess" :key="ind">
          <div class="time flex-center-center">
            <div class="content">
              <div class="font-bold">{{ item.match_time }}</div>
              <div>{{ item.match_date }}</div>
              <div>{{ item.homesite }}</div>
            </div>
          </div>
          <div class="opponent align-center">
            <div class="left">
              <img :src="item.team_image_thumb_a" alt />
              <span class="font-bold">{{ item.team_short_name_a }}</span>
              <span class="score">{{ item.team_a_win }}</span>
            </div>
            <div class="right">
              <span class="score">{{ item.team_b_win }}</span>
              <span class="font-bold">{{ item.team_short_name_b }}</span>
              <img :src="item.team_image_thumb_b" alt />
            </div>
          </div>
          <div class="btns">
            <div class="btn">赛事前瞻</div>
            <div class="btn">直播预约</div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import competitionApi from "./competitionApi";
import { ref, reactive, onMounted } from "vue";
// 赛事
function _competition() {
  let competitionList = ref(""); //赛事信息列表
  let currentMatch = ref(""); //当前赛事
  let sliceCompe = ref(20); //当前赛事截取数量
  async function _getCompetitionList() {
    let res = await competitionApi.getCompetitionList();
    competitionList.value = res.data.list;
    currentMatch.value = res.data.current_tournament.tournamentID;
  }
  // 
  let _showMoreCompet = () => {
      sliceCompe.value = competitionList.value.length;
  }
  onMounted(() => {
    _getCompetitionList();
  });
  return { competitionList, currentMatch, sliceCompe, _showMoreCompet };
}
export default {
  setup() {
    let {
      competitionList,
      currentMatch,
      sliceCompe,
      _showMoreCompet
    } = _competition();
    return {
      competitionList,
      currentMatch,
      sliceCompe,
      _showMoreCompet
    };
  }
};
</script>
