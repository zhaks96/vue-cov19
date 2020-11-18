export default {
  state: {
    cities: [],
  },
  getters: {
      getCities(state){
          return state.cities
      }
  },
  mutations: {
    FETCH_CITIES(state, payload) {
      state.cities = payload;
    },
    UPDATE_INFECTED(state, payload){
        console.log(payload)
        state.cities = state.cities.map(item => {
            var city = Object.assign({}, item);
            if (city.id === payload.id) {
                city.infected = payload.infected
            }
            return city
        })
    },
    DELETE_CITY(state, id){
        const index = state.cities.findIndex(item => item.id == id)
        state.cities.splice(index, 1)
    }
  },
  actions: {
    fetchCities({ commit }) {
      const headers = { "Content-Type": "application/json" };
      fetch("https://api.covid19live.kz/v1/status", { headers })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
          commit("FETCH_CITIES", data.cities);
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    updateInfected({ commit }, payload){
        commit('UPDATE_INFECTED', payload)
    },
    deleteCity({ commit }, payload){
        commit('DELETE_CITY', payload)
    }
  },
};
