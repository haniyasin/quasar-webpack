<template>
  <q-page class="flex q-pa-md justify-center flex-center">
   <div class="row fit  wrap justify-center items-center content-between">
  <div class="col-6 self-center justify-center  items-center">
    <q-btn to="/importhistorysimple" color="primary"    icon="fas fa-barcode"  size="50px" >
       
    </q-btn>
    <div class="text-h6"> <br> barcode </div>
  </div>
  <div class="col-6 justify-center items-center">
   <q-btn  to="/importhistory" color="primary"    icon="flip" size="50px" >
     
    </q-btn>
      <div class="text-h6">receipts<br>  </div>
  </div>
  
</div>
  <div class="row fit  wrap justify-center items-center content-between">
  <div class="col items-center">
   
     
  </div>
  <div class="col items-center">
     
  </div>
  
</div>
  </q-page>
</template>


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
