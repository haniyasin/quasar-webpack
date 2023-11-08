<template>
      <section class="page-section q-mt-lg" >
          <div class="container-fluid">
              <div class="row justify-center q-col-gutter-md">
                  <div  class="col-12 col-sm-6 col-md-3 comp-grid" >
                      <q-card  :flat="isSubPage" class="q-pa-md nice-shadow-16">
                          <div class="row justify-center q-col-gutter-md items-center">
                              <div>
                                  <q-avatar text-color="primary" font-size="48px" icon="account_circle"></q-avatar>
                              </div>
                              <div class="text-h6">{{ $t('userLogin') }}</div>
                          </div>
                      </q-card>
                      <q-card  :flat="isSubPage" class=" q-my-md q-pa-md nice-shadow-16 nice-shadow-16">
                          <div >
                              <q-form ref="observer" @submit.prevent="startLogin()">
                              <q-input class="q-mb-md" :label="$t('usernameEmailPhoneNumber')" outlined dense :placeholder="$t('usernameEmailPhoneNumber')" v-model.trim="formData.username"  required="required" type="text" >
                              <template v-slot:prepend>
                                  <q-icon name="account_circle"></q-icon>
                              </template>
                              </q-input>
                              <q-input :label="$t('password')"  class="q-mb-md" :placeholder="$t('password')" required="required" v-model="formData.password" type="password">
                              <template v-slot:prepend>
                                  <q-icon name="lock"></q-icon>
                              </template>
                              </q-input>
                              <q-select        ref="ctrldivisionid" v-model="formData.divisionid" :options="response"
                                                    option-value="DivisionID" option-label="DivisionName" :label="$t('divisionname')"  emit-value map-options >
                                                    </q-select>  
                              <div class="row q-mb-md">
                                  
                                 
                              </div>
                              <transition appear enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
                                  <q-banner dense  inline-actions rounded  class="bg-red-2 q-my-md" v-if="loginErrorMsg">
                                      <template v-slot:avatar>
                                          <q-icon color="red" name="error"></q-icon>
                                      </template>
                                      {{ loginErrorMsg }}
                                      <template v-slot:action>
                                          <q-btn @click="loginErrorMsg = null" dense flat icon="close" />
                                          </template>
                                      </q-banner>
                                  </transition>
                                  <div class="text-center">
                                      <q-btn :label="$t('login')"  :loading="loading" color="primary" icon="lock_open" class="full-width"  type="submit"> 
                                      </q-btn>
                                  </div>
                                  </q-form>
                              </div>
                          </q-card>
                          <q-card  :flat="isSubPage" class="q-pa-md nice-shadow-16">
                              <div class="row justify-between items-center">
                                 
                                 
                              </div>
                          </q-card>
                      </div>
                  </div>
              </div>
          </section>
     
  
</template>
<script setup>
import {  computed, ref, reactive } from 'vue';
//import { useApp } from 'src/composables/app';
//import { useAuth } from 'src/composables/auth';
import {client} from 'boot/feathers'
import { useRoute, useRouter } from 'vue-router';
//import getDictionary from 'boot/getdectionary'
const response = ref([])
 client.service('divisions').find().then((res)=>{
   response.value = res.data
 })
console.log('response',response)
const route = useRoute();
const router = useRouter();
//const auth = useAuth();
//const app = useApp();
const formData = reactive({
  username: '',
  password:'',
  divisionid:'DEFAULT'
});
const pageReady = ref(true);
const loading = ref(false);
const loginErrorMsg = ref('');
const rememberUser = ref(false);
async function startLogin (){
  try{
    loading.value = true;
    
      
      
    await client.authenticate({
    strategy: 'local',
    EmployeeID:formData.username ,
    EmployeePassword: formData.password,
  },{query:{DivisionID: formData.divisionid}});
    loading.value = false;
   
      let nextUrl = route.query.nexturl || '/'
        if(nextUrl == '/login'){
            nextUrl = '/'
        }
        router.push({ path: nextUrl });
    
   
  }
  catch(error){
    loading.value = false;
    console.log('error',error);
    loginErrorMsg.value = error//.request?.response || "Unable to establish connection...";
  }
}

</script>
<style></style>
