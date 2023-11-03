<template>
  <baidu-map
    :center="center"
    :zoom="zoom"
    @ready="initMap"
    class="map"
  ></baidu-map>
</template>

<script>
export default {
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 10,
    };
  },
  methods: {
    initMap({ BMap, map }) {
      console.log(BMap, map);
      map.enableScrollWheelZoom(true);
      map.strokeColor = "blue",
      this.center.lng = 116.387112;
      this.center.lat = 39.920977;
      this.zoom = 15;
      
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>