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
          <td>{{ qna.category }}</td>
        </tr>
        <tr>
          <td>등록자</td>
          <td>{{ qna.username }}</td>
        </tr>
        <tr>
          <td>등록일</td>
          <td>{{ qna.registeredDate }}</td>
        </tr>
        <tr>
          <td>내용</td>
          <td>{{ qna.content }}</td>
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

    <h3>답변하기</h3>
    <form @submit.prevent="submitAnswer">
      <div>
        <label for="answerContent">내용</label>
        <textarea id="answerContent" v-model="answerContent" rows="5"></textarea>
      </div>
      <button type="submit">등록하기</button>
    </form>

    <button @click="goToList" class="back-button">목록으로</button>
  </div>
</template>

<script>
export default {
  name: "QandADetail",
  props: ["id"],
  data() {
    return {
      qna: {},
      answerContent: "",
    };
  },
  created() {
    const qnaId = this.id;
    if (qnaId === "new") {
      this.qna = {
        id: qnaId,
        category: "",
        username: "",
        registeredDate: new Date().toISOString().split("T")[0],
        content: "",
        answerer: "",
        answerContent: "",
      };
    } else {
      // 실제로는 API 호출 등을 통해 qnaId에 해당하는 데이터를 가져와야 합니다.
      // 예시 데이터
      this.qna = {
        id: qnaId,
        category: "취업",
        username: "창정환",
        registeredDate: "2024-02-10",
        content:
          "안녕하세요 개발자 취업을 희망하는 창정환입니다. 개발자 취업정보는 어디서 찾나요?",
        answerer: "",
        answerContent: "",
      };
    }
  },
  methods: {
    submitAnswer() {
      // 답변 제출 로직
      console.log("답변 내용:", this.answerContent);
      // 실제로는 API 호출 등을 통해 답변을 제출해야 합니다.
      this.qna.answerContent = this.answerContent;
      this.qna.answerer = "관리자"; // 답변자를 예시로 "관리자"로 설정

      // 답변 제출 후 리스트 페이지로 이동
      this.$router.push({ name: "QandAList" });
    },
    goToList() {
      // 목록 페이지로 이동
      this.$router.push({ name: "QandAList" });
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
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