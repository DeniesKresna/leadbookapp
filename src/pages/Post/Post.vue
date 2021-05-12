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
                  @click="showPostModal('create')"
                ><v-icon>mdi-plus</v-icon>
                  Create</v-btn>
              </span>
            </v-row>
            <v-row no-gutters class="company-widget pb-6">
              <v-col cols="12" class="card-dark-grey">
                <v-row>
                  <v-data-table
                    :headers="post.headers"
                    :items="post.datas"
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
                      :value="posts.current_page"
                      :length="posts.last_page"
                      :total-visible="7"
                      @input="loadData"
                    ></v-pagination>
                    Found {{posts.data.length}} datas
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <modal-form
    :show="postModal.show"
    :mode="postModal.mode"
    :label="postModal.label"
    :datas="postModal.datas"
    @cancelClick="postModal = {}"
    @submitClick="processPostModal"
    />
</div>
</template>

<script>
import _ from 'lodash';
import ModalForm from '@/components/Modal/Form';
import rules from '@/rules';
export default {
  name: 'Post',
  components: {
    ModalForm
  },
  data(){
    return {
      posts: {
        header: [
          { text: 'Title', value: 'title' },
          { text: 'Author', value: 'calories' },
	        { text: 'Action', value: 'actions'},
        ],
        datas: []
      },
      search: "",
      isTyping: false,
      postModal: {}
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
        payload += "&title=" + this.search;
      }
      let res = await this.$store.dispatch('post/index',payload);
      this.post.datas = res;
    },
    async doAction(mode='create', item=null){
      let dt = {};
      if(this.mode == 'edit'){
        JSON.parse(JSON.stringify(item));
      }
      if(this.mode == 'edit' || this.mode == 'create' || this.mode == 'show'){
        this.postModal = {
          show: true,
          mode: mode,
          label: 'Post',
          datas: [
            {name: 'name', value: dt.name, label: 'Post Name', editable:false, input:"text", rules:rules.name},
            {name: 'image', value: dt.image, label: 'Post Picture', editable:false, input:"media", rules:""},
            {name: 'address', value: dt.address, label: 'Post Address', editable:false, input:"text", rules:""},
            {name: 'phone', value: dt.phone, label: 'Post Phone', editable:false, input:"text", rules:rules.phone},
            {name: 'description', value: dt.description, label: 'Post Description', editable:false, input:"textarea", rules:""}
          ]
        }
      }else{
        await this.$store.dispatch('post/destroy',item);
      }
    },
    async processPostModal(dt){
      if(dt.datas.length > 0){
        let payload = new FormData();
        dt.datas.forEach((item)=>{
          payload.append(item.name,item.value);
        });
        if(dt.mode == 'create')
          await this.$store.dispatch('post/store',payload);
        else
          await this.$store.dispatch('post/update',payload);
        this.postModal = {};
        this.loadData();
      }else{
        alert("no data");
      }
    }
  },
  computed: {
    page(){
      return this.$store.state.page;
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
