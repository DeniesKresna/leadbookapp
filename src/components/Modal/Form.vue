<template>
<v-dialog
    v-model="dialog.show"
    persistent
  >
  <v-card>
    <v-card-title class="headline text-capitalize">{{dialog.mode }} {{dialog.entity}}</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <div v-if="datas.length > 0">
            <div v-for="data in datas" :key="data.name">
                <v-col cols="12" v-if="data.input=='text'">
                    <v-text-field v-model="data.value" :label="data.label" :readonly="(dialog.mode == 'edit' && !data.editable) || dialog.mode == 'show'"></v-text-field>
                </v-col>
                <v-col cols="12" v-if="data.input=='number'">
                    <v-text-field v-model="data.value" :label="data.label" type="number" :readonly="(dialog.mode == 'edit' && !data.editable) || dialog.mode == 'show'"></v-text-field>
                </v-col>
                <v-col cols="12" v-if="data.input=='textarea'">
                    <v-textarea v-model="data.value" :label="data.label" :readonly="(dialog.mode == 'edit' && !data.editable) || dialog.mode == 'show'"></v-textarea>    
                </v-col>
                <v-col cols="12" v-if="data.input=='media'">
                    <img :src="data.url" height="200" />
                </v-col>
                <v-col cols="12" v-if="data.input=='media'">
                    <v-file-input v-model="data.value" accept="image/*" :label="data.label"  @change="setDataImage(data)" :disabled="dialog.mode == 'show'"></v-file-input>
                </v-col>
            </div>
          </div>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="dialog.mode != 'show'"
        color="green darken-1"
        text
        @click="processData(dialog.mode)"
      >
        <span class="text-capitalize">{{dialog.mode}}</span>
      </v-btn>
      <v-btn
        color="red darken-1"
        text
        @click="dialog.show = false"
      >
        Batal
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script>
export default{
    props:["modalConfig","formDatas"],
    data() {
        return {
            dialog: this.modalConfig,
            datas: this.formDatas
        }
    },
    methods: {
        setDataImage: function(img,data){
			if(img != null){
				data.url = URL.createObjectURL(img);
			}else{
				data.url = "@/assets/noimage.png";
			}
		}
    }
}
</script>