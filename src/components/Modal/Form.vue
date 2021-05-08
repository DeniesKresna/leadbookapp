<template>
<v-dialog
    :value="show"
    persistent
  >
  <v-card>
    <v-card-title class="headline text-capitalize">{{mode}} {{label}}</v-card-title>
    <v-card-text>
      <v-container>
        <div v-if="datas.length > 0">
          <v-row v-for="data in datas" :key="data.name">
              <v-col cols="12" sm="12" md="12" lg="12" v-if="data.input=='text'">
                  <v-text-field v-model="data.value" :label="data.label" :readonly="(mode == 'edit' && !data.editable) || mode == 'show'"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" v-if="data.input=='number'">
                  <v-text-field v-model="data.value" :label="data.label" type="number" :readonly="(mode == 'edit' && !data.editable) || mode == 'show'"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" v-if="data.input=='textarea'">
                  <v-textarea v-model="data.value" :label="data.label" :readonly="(mode == 'edit' && !data.editable) || mode == 'show'"></v-textarea>    
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" v-if="data.input=='media'">
                  <img :src="data.url" height="200" />
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" v-if="data.input=='media'">
                  <v-file-input v-model="data.value" accept="image/*" :label="data.label"  @change="setDataImage(data)" :disabled="mode == 'show'"></v-file-input>
              </v-col>
          </v-row>
        </div>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="mode != 'show'"
        color="green darken-1"
        text
        @click="processData(mode)"
      >
        <span class="text-capitalize">{{mode}}</span>
      </v-btn>
      <v-btn
        color="red darken-1"
        text
        @click="cancelClicked"
      >
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script>
export default{
    props:{
      show: {type: Boolean, default: false},
      mode: {type: String, default: 'create'},
      label: {type: String, default: 'table'},
      datas: {type: Array, default: function(){
        return [];
      }}
    },
    data() {
        return {
        }
    },
    methods: {
      setDataImage(img,data){
        if(img != null){
          data.url = URL.createObjectURL(img);
        }else{
          data.url = "@/assets/noimage.png";
        }
      },
      process(){
        this.$emit('submitClick');
      },
      cancelClicked(){
        this.$emit('cancelClick');
      }
    }
}
</script>