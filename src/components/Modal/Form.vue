<template>
<div>
<ValidationObserver ref="obs">
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
                  <ValidationProvider name="data.name" :rules="data.rules">
                    <v-text-field v-model="data.value" :label="data.label" :readonly="(mode == 'edit' && !data.editable) || mode == 'show'"
                      slot-scope="{errors}"
                      :error-messages="errors"></v-text-field>
                  </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" v-if="data.input=='number'">
                  <ValidationProvider name="data.name" :rules="data.rules">
                    <v-text-field v-model="data.value" :label="data.label" type="number" :readonly="(mode == 'edit' && !data.editable) || mode == 'show'"
                      slot-scope="{errors}"
                      :error-messages="errors"></v-text-field>
                  </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" v-if="data.input=='textarea'">
                  <ValidationProvider name="data.name" :rules="data.rules">
                    <v-textarea v-model="data.value" :label="data.label" :readonly="(mode == 'edit' && !data.editable) || mode == 'show'"
                      slot-scope="{errors}"
                      :error-messages="errors"></v-textarea>    
                  </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" v-if="data.input=='media'">
                  <img :src="data.url" height="200" v-if="data.value != null" :ref="data.name"/>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" v-if="data.input=='media'">
                  <ValidationProvider name="data.name" :rules="data.rules">
                    <v-file-input v-model="data.value" accept="image/*" :label="data.label"  @change="setDataImage(data)" :disabled="mode == 'show'"
                      slot-scope="{errors}"
                      :error-messages="errors"></v-file-input>
                  </ValidationProvider>
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
        @click="submitClicked"
      >
        <span>{{mode}}</span>
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
</ValidationObserver>
</div>
</template>
<script>
import {
    ValidationProvider,
    ValidationObserver,
  } from "vee-validate";
export default{
    props:{
      show: {type: Boolean, default: false},
      mode: {type: String, default: 'create'},
      label: {type: String, default: 'table'},
      datas: {type: Array, default: function(){
        return [];
      }}
    },
    components: {
      ValidationProvider, ValidationObserver
    },
    data() {
        return {
        }
    },
    methods: {
      setDataImage(data){
        data.url = URL.createObjectURL(data.value);
      },
      submitClicked(){
        this.$emit('submitClick');
      },
      cancelClicked(){
        this.$emit('cancelClick');
      }
    }
}
</script>