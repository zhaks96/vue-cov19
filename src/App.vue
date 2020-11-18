<template>
  <div id="app">
    <h1>Коронавирусная инфекция (COVID-19)</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Наименование</th>
          <th scope="col">Количество выздоровевших</th>
          <th scope="col">Количество зараженных</th>
          <th scope="col">Количество погибших</th>
          <th scope="col">Координаты</th>
          <th scope="col">Действие</th>
        </tr>
      </thead>
      <tbody>
        <cities-list
          v-for="(city, index) in paginatedCities"
          :key="city.id"
          :city="city"
          :index="index"
        />
      </tbody>
    </table>

    <div class="section__pagination">
      <div class="page" v-if="hasPrev()" @click="prevPage()">
        Пред.
      </div>
      <div class="page" v-if="hasFirst()" @click="pageClick(1)">
        1
      </div>
      <div class="page_around" v-if="hasFirst()">
        ...
      </div>
      <div
        class="page"
        v-for="page in pages"
        :key="page"
        :class="{ page__selected: pageNum == page }"
        @click="pageClick(page)"
      >
        {{ page }}
      </div>
      <div class="page_around" v-if="hasLast()">
        ...
      </div>
      <div class="page" v-if="hasLast()" @click="pageClick(pagesCount)">
        {{ pagesCount }}
      </div>
      <div class="page" v-if="hasNext()" @click="nextPage()">
        След.
      </div>
    </div>
  </div>
</template>

<script>
import CitiesList from "./components/CitiesList";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    CitiesList,
  },
  props: {
    pageRanger: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      errorMessage: "",
      perPage: 5,
      pageNumber: 1,
    };
  },
  computed: {
    ...mapGetters(['getCities']),
    cities(){
      return this.getCities
    },
    pagesCount() {
      return Math.ceil(this.cities.length / 5);
    },
    pageNum(){
      return this.pageNumber > this.pagesCount ? this.pagesCount : this.pageNumber
    },
    paginatedCities() {
      let from = (this.pageNum - 1) * this.perPage;
      let to = from + this.perPage;
      // console.log(from, to, this.pageNum)
      return this.cities.slice(from, to);
    },
    rangeStart() {
      let start = this.pageNum - this.pageRanger;
      return start > 0 ? start : 1;
    },
    rangeEnd() {
      let end = this.pageNum + this.pageRanger;
      return end < this.pagesCount ? end : this.pagesCount;
    },
    pages() {
      let pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    ...mapActions(["fetchCities"]),
    pageClick(page) {
      this.pageNumber = page;
    },
    hasPrev() {
      return this.pageNumber > 1;
    },
    hasNext() {
      return this.pageNumber < this.pagesCount;
    },
    prevPage() {
      return (this.pageNumber -= 1);
    },
    nextPage() {
      return (this.pageNumber += 1);
    },
    hasFirst() {
      return this.rangeStart !== 1;
    },
    hasLast() {
      return this.rangeEnd < this.pagesCount;
    },
  },
  created() {
    this.fetchCities();
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 22px 0;
  h1 {
    margin-bottom: 32px;
    font-size: 28px;
  }
  table tbody tr {
    color: #ffffff;
  }
}
</style>
