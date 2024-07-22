<template>
  <header>
    <div class="header_admin">
      <div class="pika-container">
        <img
          src="../assets/img/codingpikka.png"
          alt="피카 이미지"
          class="pika-image"
        />
        <span class="pika-comment">Coding_Pikka</span>
      </div>
      <div class="header_post">
        <a href="#"> 게시물 목록 </a>
      </div>
      <div class="header_screen">
        <a href="#"> 화면 관리 </a>
      </div>
      <div class="header_information">
        <a href="#"> 정보 등록 </a>
      </div>
      <div class="header_etc">
        <a href="#"> 기타 </a>
      </div>
      <div>로그아웃 아이콘</div>
    </div>
  </header>
</template>

<script></script>

<style scoped>
.header_admin {
  height: 150px;
  background-color: #b3b3b3;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
}

.pika-container {
}

.pika-image {
  width: 100px; /* 고정 너비 */
  height: 100px; /* 고정 높이 */
  object-fit: cover; /* 이미지 비율 유지 */
  border-radius: 50%;
}

.pika-comment {
  color: black;
  padding: 5px;
  border-radius: 10px;
  font-size: 15px;
  display: flex;
  justify-content: center;
}
</style>
