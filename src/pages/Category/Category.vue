<template>
<div>
  <v-container fluid class="company-page">
    <h1 class="page-title mt-10 mb-6">{{page}}</h1>
    <v-row>
      <v-col lg=12 cols=12>
        <v-card class="mx-1 mb-1">
          <v-card-title class="pa-6 pb-3">
            <p>{{page}}</p>
          </v-card-title>
          <v-card-text class="pa-6 pt-0">
            <v-row no-gutters class="company-widget pb-0">
              <span>
                <v-text-field
                  v-model="search"
                  label="Filter Title"
                  @input="isTyping = true"
                ></v-text-field>
              </span>
              <v-spacer />
              <span>
                <v-btn
                  large
                  color="primary"
                  @click="showCategoryModal('create')"
                ><v-icon>mdi-plus</v-icon>
                  Create</v-btn>
              </span>
            </v-row>
            <v-row no-gutters class="company-widget pb-6">
              <v-col cols="12" class="card-dark-grey">
                <v-row>
                  <v-data-table
                    :headers="category.headers"
                    :items="category.datas"
                    :disable-sort="true"
                    :hide-default-footer="true"
                    :hide-default-header="true"
                    show-select
                    item-key="id"
                    class="elevation-1"
                  >
                    <template v-slot:[`item.actions`]="{ item }">
							    	  <v-icon
								        small
								        class="mr-2"
								        @click="doAction('show',item)"
								      >
								        mdi-eye
								      </v-icon>
								      <v-icon
								        small
								        class="mr-2"
								        @click="doAction('edit',item)"
								      >
								        mdi-pencil
								      </v-icon>
								      <v-icon
								        small
								        @click="doAction('delete',item)"
								      >
								        mdi-delete
								      </v-icon>
								    </template>
                  </v-data-table>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="text-center">
                    <v-pagination
                      :value="categories.current_page"
                      :length="categories.last_page"
                      :total-visible="7"
                      @input="loadData"
                    ></v-pagination>
                    Found {{categories.data.length}} datas
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <modal-form
    :show="categoryModal.show"
    :mode="categoryModal.mode"
    :label="categoryModal.label"
    :datas="categoryModal.datas"
    @cancelClick="categoryModal = {}"
    @submitClick="processCategoryModal"
    />
</div>
</template>

<script>
import ModalForm from '@/components/Modal/Form';
import rules from '@/rules';
export default {
  name: 'Category',
  components: {
    ModalForm
  },
  data(){
    return {
      page: "Category",
      category: {
        header: [
          { text: 'Name', value: 'name' },
	      { text: 'Action', value: 'actions'},
        ],
        datas: []
      },
      search: "",
      isTyping: false,
      categoryModal: {}
    }
  },
  created(){
    this.loadData(1);
    this.loadFavourite();
  },
  methods: {
    async loadData(page = 1){
      let payload = "?page="+page;
      if((this.search).trim().length > 0){
        payload += "&name=" + this.search;
      }
      let res = await this.$store.dispatch('category/index',payload);
      this.category.datas = res;
    },
    async doAction(mode='create', item=null){
      let dt = {};
      if(this.mode == 'edit'){
        JSON.parse(JSON.stringify(item));
      }
      if(this.mode == 'edit' || this.mode == 'create' || this.mode == 'show'){
        this.categoryModal = {
          show: true,
          mode: mode,
          label: 'Category',
          datas: [
            {name: 'name', value: dt.name, label: 'Category Name', editable:false, input:"text", rules:rules.name},
            {name: 'image', value: dt.image, label: 'Category Picture', editable:false, input:"media", rules:""},
            {name: 'address', value: dt.address, label: 'Category Address', editable:false, input:"text", rules:""},
            {name: 'phone', value: dt.phone, label: 'Category Phone', editable:false, input:"text", rules:rules.phone},
            {name: 'description', value: dt.description, label: 'Category Description', editable:false, input:"textarea", rules:""}
          ]
        }
      }else{
        await this.$store.dispatch('category/destroy',payload);
      }
    },
    async processCategoryModal(dt){
      if(dt.datas.length > 0){
        let payload = new FormData();
        dt.datas.forEach((item)=>{
          payload.append(item.name,item.value);
        });
        if(dt.mode == 'create')
          await this.$store.dispatch('category/store',payload);
        else
          await this.$store.dispatch('category/update',payload);
        this.categoryModal = {};
        this.loadData();
      }else{
        alert("no data");
      }
    }
  },
  watch: {
    search: _.debounce(function() {
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
