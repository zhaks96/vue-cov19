<template>
  <tr :style="{ background: getBg(city.infected) }">
    <th>{{ city.name }}</th>
    <td>{{ city.recovered }}</td>
    <td v-if="cityChange.id == 0">{{ city.infected }}</td>
    <td v-if="city.id == cityChange.id">
      <div class="form-group">
        <input
          type="number"
          min="0"
          class="form-control"
          placeholder="Количество зараженных"
          v-model="infectedVal"
        />
        <div class="mt-2">
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="updateInfect(city)"
          >
            сохранить
          </button>
          <button type="button" class="btn btn-dark" @click.prevent="cancel">
            отмена
          </button>
        </div>
      </div>
    </td>
    <td>{{ city.deaths }}</td>
    <td> 
        <a :href="'https://yandex.ru/maps/?pt=' + city.longitude + ',' + city.latitude +'&z=17&l=map'" 
        target="_blank"
        style="color: #ffffff">открыть карту</a>
    </td>
    <td>
      <div class="buttons">
        <button @click.prevent="update(city)" v-if="cityChange.id == 0">
          <i class="material-icons">edit</i>
        </button>
        <button @click.prevent="deleteCityId(city.id)">
          <i class="material-icons">delete</i>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    city: {
      type: Object,
      default: () => {
        return {};
      },
    },
    index:{
        type: Number
    },
  },
  data() {
    return {
      cityChange: { id: 0 },
      infectedVal: 0,
    };
  },
  computed: {
    getBg() {
      return function(countInfected) {
        if (countInfected < 1000) return "blue";
        else if (countInfected < 5000) return "cyan";
        else if (countInfected < 10000) return "indigo";
        else return "red";
      };
    },
  },
  methods: {
    ...mapActions(["updateInfected", "deleteCity"]),
    updateInfect(city) {
      if (city) {
        this.updateInfected({
          id: city.id,
          infected: parseInt(this.infectedVal)
        });
        this.cityChange = { id: 0 };
      }
    },
    update(city) {
      this.cityChange = city;
      this.infectedVal = city.infected;
    },
    cancel() {
      this.cityChange = { id: 0 };
    },
    deleteCityId(id) {
      this.deleteCity(id);
    },
  },
};
</script>
