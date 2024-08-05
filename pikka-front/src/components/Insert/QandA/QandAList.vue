<template>
  <div>
    <h2>문의 사항</h2>
    <!-- <button @click="addRandomQna">임의 문의사항 추가</button> -->
    <table>
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
        <tr v-if="!qnaList || qnaList.length === 0">
          <td colspan="8">문의 사항이 없습니다.</td>
        </tr>
        <tr v-else v-for="(item, index) in qnaList" :key="item.contactId">
          <td>{{ index + 1 }}</td>
          <td>{{ item.contactType || "-" }}</td>
          <td>
            <router-link :to="{ name: 'QandADetail', params: { id: item.contactId } }">{{
              item.contactContents || "-"
            }}</router-link>
          </td>
          <td>{{ item.userName || "-" }}</td>
          <td>{{ item.contactPostedDate || "-" }}</td>
          <td>{{ item.responsePostedDate || "-" }}</td>
          <td>{{ item.responseStatus || "-" }}</td>
          <td class="action-cell">
            <button @click="deleteQna(item.contactId)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QandAList",
  data() {
    return {
      qnaList: [],
    };
  },
  created() {
    this.fetchQnaList();
  },
  methods: {
    fetchQnaList() {
      axios
        .get("http://localhost:8080/insert/qna-list")
        .then((response) => {
          this.qnaList = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the Q&A list!", error);
        });
    },
    addRandomQna() {
      const newQna = {
        userId: 1,
        userName: "임의 사용자",
        contactType: "임의 카테고리",
        contactContents: "임의 제목",
        contactPostedDate: new Date().toISOString().split("T")[0],
        responsePostedDate: null,
        responseStatus: "미완료",
      };
      axios
        .post("http://localhost:8080/insert/qna-list", newQna)
        .then((response) => {
          this.qnaList.push(response.data);
        })
        .catch((error) => {
          console.error("There was an error adding the Q&A!", error);
        });
    },
    deleteQna(contactId) {
      axios
        .delete(`http://localhost:8080/insert/qna-list/${contactId}`)
        .then(() => {
          this.qnaList = this.qnaList.filter((qna) => qna.contactId !== contactId);
        })
        .catch((error) => {
          console.error("There was an error deleting the Q&A!", error);
        });
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
}

button:hover {
  background-color: #369f6e;
}

.action-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
