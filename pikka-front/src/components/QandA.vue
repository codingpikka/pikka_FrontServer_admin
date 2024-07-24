<template>
  <div>
    <h2>문의사항</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>분류</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="category">카테고리</td>
            <td>취업</td>
          </tr>
          <tr>
            <td class="category">등록자</td>
            <td>황정한</td>
          </tr>
          <tr>
            <td class="category">등록일</td>
            <td>2024 · 02 · 10</td>
          </tr>
          <tr>
            <td class="category">내용</td>
            <td>안녕하세요 개발자 취업을 희망하는 황정한입니다! 개발자 취업정보는 어디서 찾나요?</td>
          </tr>
          <tr>
            <td class="category">답변자</td>
            <td>{{ answerer }}</td>
          </tr>
          <tr>
            <td class="category">답변내용</td>
            <td>{{ answer }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="answer-container">
      <h2>답변하기</h2>
      <div class="form-group">
        <label for="answerer">답변자</label>
        <input type="text" id="answerer" v-model="answerer" />
      </div>
      <div class="form-group">
        <label for="answer">내용</label>
        <textarea id="answer" v-model="answer"></textarea>
      </div>
      <div class="button-container">
        <button @click="submitAnswer">등록하기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobInquiryTable',
  data() {
    return {
      answerer: '',
      answer: ''
    };
  },
  methods: {
    submitAnswer() {
      // 답변 제출 로직을 여기에 추가하세요
      console.log('답변자:', this.answerer);
      console.log('답변 내용:', this.answer);
    }
  }
};
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

td {
  background-color: #fff;
}

tbody tr:nth-child(even) td {
  background-color: #f9f9f9;
}

.category {
  background-color: #f2dede;
}

.answer-container {
  background-color: #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 150px;
}

.button-container {
  text-align: right;
}

button {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>