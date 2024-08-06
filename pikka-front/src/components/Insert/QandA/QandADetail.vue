<template>
  <div>
    <h2>문의 사항</h2>
    <table>
      <thead>
        <tr>
          <th>항목</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>카테고리</td>
          <td>{{ qna.contactType }}</td>
        </tr>
        <tr>
          <td>등록자</td>
          <td>{{ qna.userName }}</td>
        </tr>
        <tr>
          <td>등록일</td>
          <td>{{ qna.contactPostedDate }}</td>
        </tr>
        <tr>
          <td>내용</td>
          <td>{{ qna.contactContents }}</td>
        </tr>
        <tr>
          <td>답변자</td>
          <td>{{ qna.answerer || "-" }}</td>
        </tr>
        <tr>
          <td>답변내용</td>
          <td>{{ qna.answerContent || "-" }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="!qna.answerContent">
      <form @submit.prevent="submitAnswer">
        <div>
          <label for="answerContent">내용</label>
          <textarea id="answerContent" v-model="answerContent" rows="5"></textarea>
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>

    <button @click="goToList" class="back-button">목록으로</button>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  name: "QandADetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const qna = ref({});
    const answerContent = ref("");

    const fetchQnaDetail = (qnaId) => {
      axios
        .get(`http://localhost:8083/insert/qna-list/${qnaId}`)
        .then((response) => {
          qna.value = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the Q&A detail!", error);
        });
    };

    const submitAnswer = () => {
      const qnaId = route.params.id;
      const currentDate = new Date().toISOString().split("T")[0];
      axios
        .put(`http://localhost:8083/insert/qna-list/${qnaId}/answer`, {
          answerContent: answerContent.value,
          responsePostedDate: currentDate,
        })
        .then((response) => {
          qna.value.answerContent = answerContent.value;
          qna.value.answerer = "관리자";
          qna.value.responsePostedDate = currentDate;
          qna.value.responseStatus = "완료";
          router.push({ name: "QandAList" });
        })
        .catch((error) => {
          console.error("There was an error submitting the answer!", error);
        });
    };
    const goToList = () => {
      router.push({ name: "QandAList" });
    };

    onMounted(() => {
      const qnaId = route.params.id;
      if (qnaId !== "new") {
        fetchQnaDetail(qnaId);
      }
    });

    return {
      qna,
      answerContent,
      fetchQnaDetail,
      submitAnswer,
      goToList,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

form {
  margin-top: 20px;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}

.back-button {
  margin-top: 20px;
  background-color: #f44336;
}

.back-button:hover {
  background-color: #d32f2f;
}
</style>
