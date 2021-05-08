<template>
<div>
  <v-container fluid class="company-page">
    <h1 class="page-title mt-10 mb-6">Company</h1>
    <v-row>
      <v-col lg=9 cols=12>
        <v-card class="mx-1 mb-1">
          <v-card-title class="pa-6 pb-3">
            <p>Companies</p>
          </v-card-title>
          <v-card-text class="pa-6 pt-0">
            <v-row no-gutters class="company-widget pb-0">
              <span>
                <v-text-field
                  v-model="companyFilter.name"
                  label="Filter Name"
                  @input="isTyping = true"
                ></v-text-field>
              </span>
              <v-spacer />
              <span>
                <v-btn
                  class="text-capitalize"
                  large
                  color="primary"
                  @click="showCompanyModal('create')"
                ><v-icon>mdi-plus</v-icon>
                  Create</v-btn>
              </span>
            </v-row>
            <v-row no-gutters class="company-widget pb-6">
              <v-col cols="12" class="card-dark-grey">
                <v-row>
                  <v-col lg="4" md="6" cols="12" v-for="company in companies.data" :key="company.id">
                    <company-card :company="company" @favouriteClick="setFavourite"/>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="text-center">
                    <v-pagination
                      :value="companies.current_page"
                      :length="companies.last_page"
                      :total-visible="7"
                      @input="loadData"
                    ></v-pagination>
                    Found {{companies.data.length}} datas
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg=3 cols=12>
        <v-card class="mx-1 mb-1">
          <v-card-title class="pa-6 pb-3">
            <p>Typography Colors</p>
          </v-card-title>
          <v-card-text class="pa-6 pt-0">
            <v-row no-gutters class="company-widget pb-6">
              <v-col cols="12" class="card-dark-grey">
                <h1 class="primary--text">h1. Heading</h1>
                <h2 class="success--text">h2. Heading</h2>
                <h3 class="secondary--text">h3. Heading</h3>
                <h4 class="warning--text">h4. Heading</h4>
                <h5 class="primary--text">h5. Heading</h5>
                <h6 class="info--text">h6. Heading</h6>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <modal-form
    :show="companyModal.show"
    :mode="companyModal.mode"
    :label="companyModal.label"
    :datas="companyModal.datas"
    @cancelClick="companyModal = {}"
    @submitClick="processCompanyModal"
    />
</div>
</template>

<script>
import _ from 'lodash';
import CompanyCard from '@/components/CompanyCard';
import ModalForm from '@/components/Modal/Form';
export default {
  name: 'Company',
  components: {
    CompanyCard, ModalForm
  },
  data(){
    return {
      companies: {
        data: []
      },
      companyFilter: {
        name: ""
      },
      companyData: {},
      isTyping: false,
      companyModal: {}
    }
  },
  created(){
    this.loadData(1);
  },
  methods: {
    async loadData(page = 1){
      let payload = "?page="+page;
      if((this.companyFilter.name).trim().length > 0){
        payload += "&name=" + this.companyFilter.name;
      }
      let res = await this.$store.dispatch('company/index',payload);
      this.companies = res;
    },
    async setFavourite(payload){
      await this.$store.dispatch('company/setFavourite', payload);
      this.loadData(this.companies.current_page);
    },
    showCompanyModal(mode='create'){
      this.companyModal = {
        show: true,
        mode: mode,
        label: 'Company',
        datas: [
          {name: 'name', value: '', label: 'Company Name', editable:false, input:"text"}
        ]
      }
    },
    async processCompanyModal(){
      if(this.companyModal.datas.length > 0){
        let datas = this.companyModal.datas;
        let payload = new FormData();
        for ( let data in datas ) {
            payload.append(data.name,data.value);
        }
        await this.$store.dispatch('company/store',payload);
        this.companyModal = {};
        this.loadData();
      }else{
        alert("no data");
      }
    }
  },
  watch: {
    companyFilter: _.debounce(function() {
      this.isTyping = false;
    }, 1000),
    isTyping: function(value) {
      if (!value) {
        this.loadData();
      }
    }
  },
};
</script>

<style src="./Company.scss" scoped lang="scss"></style>
