<template>
  <div id="main-banner">
    <h1>Make Your Burger</h1>
  </div>
</template>

<style scoped>
#main-banner {
  background-image: url('/img/burger.jpg');
  background-position: 0 -250px;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 1100px) {
    background-position: 0;
  }

  @media (min-width: 1600px) {
    background-position: 0;
  }
}

#main-banner h1 {
  color: #fff;
  text-align: center;
  font-size: 60px;
  background-color: #222;
  padding: 20px 40px;
}
</style>