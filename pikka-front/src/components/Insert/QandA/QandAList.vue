<template>
  <div>
    <h2>문의 사항</h2>
    <button @click="addRandomQna">임의 문의사항 추가</button>
    <table v-if="qnaList.length > 0">
      <thead>
        <tr>
          <th>NO</th>
          <th>카테고리</th>
          <th>제목</th>
          <th>유저이름</th>
          <th>등록일자</th>
          <th>답변날짜</th>
          <th>문의상태</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in qnaList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.category || "-" }}</td>
          <td>
            <router-link :to="{ name: 'QandADetail', params: { id: item.id } }">{{ item.title || "-" }}</router-link>
          </td>
          <td>{{ item.username || "-" }}</td>
          <td>{{ item.registeredDate || "-" }}</td>
          <td>{{ item.answeredDate || "-" }}</td>
          <td>{{ item.status || "-" }}</td>
          <td>
            <button @click="deleteQna(item.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>문의 사항이 없습니다.</p>
  </div>
</template>

<script>
export default {
  name: "QandAList",
  data() {
    return {
      qnaList: [],
    };
  },
  created() {
    // 컴포넌트가 생성될 때 로컬 스토리지에서 데이터를 불러옵니다.
    const savedQnaList = localStorage.getItem('qnaList');
    if (savedQnaList) {
      this.qnaList = JSON.parse(savedQnaList);
    }
  },
  methods: {
    addRandomQna() {
      const newQna = {
        id: Date.now(),  // 유니크한 ID 생성
        category: "임의 카테고리",
        title: "임의 제목",
        username: "임의 사용자",
        registeredDate: new Date().toISOString().split("T")[0],
        answeredDate: "",
        status: "미완료",
      };
      this.qnaList.push(newQna);
      this.saveToLocalStorage();
    },
    deleteQna(id) {
      this.qnaList = this.qnaList.filter((qna) => qna.id !== id);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('qnaList', JSON.stringify(this.qnaList));
    },
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

router-link {
  color: #42b983;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}

button {
  background-color: #42b983;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

button:hover {
  background-color: #369f6e;
}
</style>
