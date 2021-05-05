<template>
  <v-app>
    <ValidationObserver ref="obs">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
          <div class="d-flex">
            <v-img src="@/assets/logo.png" width="400"></v-img>
            <p>Demo</p>
          </div>
        </v-col>
        <v-col cols="12" lg="5" class="login-part d-flex align-center justify-center">
          <v-row no-gutters class="align-start">
            <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
              <div class="login-wrapper pt-md-4 pt-0">
                <v-tabs v-model="activeTab" grow>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-login`" v-if="forgetPassword == false">
                    LOGIN
                  </v-tab>
                  <v-tab :href="`#tab-newUser`" v-if="forgetPassword == false">
                    New User
                  </v-tab>
                  <v-tab :href="`#tab-forgetPassword`" v-if="forgetPassword != false && resetCode==''">
                    Forget Password
                  </v-tab>
                  <v-tab :href="`#tab-resetPassword`" v-if="forgetPassword != false && resetCode != ''">
                    Reset Password
                  </v-tab>

                  <v-tab-item :value="'tab-login'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium my-10">Hi, User</p>
                            <!--
                            <v-btn height="45" block color="white" elevation="0" class="google text-capitalize">
                              <v-img src="@/assets/google.svg" max-width="30" class="mr-4"></v-img>
                              Sign in with Google</v-btn>
                          </v-col>
                          <v-col cols="12" class="d-flex align-center my-8">
                            <v-divider></v-divider>
                            <span class="px-5"> or </span>
                            <v-divider></v-divider>-->
                          </v-col>
                          <v-form>
                            <v-col>
                              <ValidationProvider name="email" :rules="rules.email">
                                <v-text-field
                                    slot-scope="{errors}"
                                    :error-messages="errors"
                                    v-model="loginData.email"
                                    placeholder="test@gmail.com"
                                    label="Email Address"
                                    required
                                ></v-text-field>
                              </ValidationProvider>
                              <ValidationProvider name="password" :rules="rules.password">
                              <v-text-field
                                  slot-scope="{errors}"
                                  :error-messages="errors"
                                  v-model="loginData.password"
                                  type="password"
                                  label="Password"
                                  placeholder="password"
                                  hint="At least 8 characters"
                                  required
                              ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  large
                                  :disabled="loginData.password.length < 8 || loginData.email.length < 5"
                                  color="primary"
                                  @click="login"
                              >
                                Login</v-btn>
                              <v-btn large text class="text-capitalize primary--text" @click="toForgetPassword">Forget Password</v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-newUser'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">

                          <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium mt-10">Register</p>
                          </v-col>

                          <v-form>
                            <v-col>
                              <ValidationProvider name="name" :rules="rules.name">
                                <v-text-field
                                    slot-scope="{errors}"
                                    :error-messages="errors"
                                    v-model="createData.name"
                                    placeholder="Your Name"
                                    label="Full Name"
                                    required
                                ></v-text-field>
                              </ValidationProvider>
                              <ValidationProvider name="username" :rules="rules.username">
                                <v-text-field
                                    slot-scope="{errors}"
                                    :error-messages="errors"
                                    v-model="createData.username"
                                    placeholder="Username"
                                    label="User Name"
                                    required
                                ></v-text-field>
                              </ValidationProvider>
                              <ValidationProvider name="email" :rules="rules.email">
                                <v-text-field
                                    slot-scope="{errors}"
                                    :error-messages="errors"
                                    v-model="createData.email"
                                    placeholder="test@gmail.com"
                                    label="Email Address"
                                    required
                                ></v-text-field>
                              </ValidationProvider>
                              <ValidationProvider name="password" :rules="rules.password">
                                <v-text-field
                                    slot-scope="{errors}"
                                    :error-messages="errors"
                                    v-model="createData.password"
                                    placeholder="your password"
                                    type="password"
                                    label="Password"
                                    hint="At least 8 characters"
                                    required
                                ></v-text-field>
                              </ValidationProvider>
                              <ValidationProvider name="phone" :rules="rules.phone">
                                <v-text-field
                                    slot-scope="{errors}"
                                    :error-messages="errors"
                                    placeholder="your Phone"
                                    v-model="createData.phone"
                                    label="Phone Number"
                                    required
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  large
                                  block
                                  :disabled="createData.name.length < 3 || createData.username.length < 3 || createData.email.length < 5 || createData.password < 8 || createData.phone < 8"
                                  color="primary"
                                  @click="register"
                              >
                                Create your account</v-btn>
                            </v-col>
                          </v-form>
                          
                          <!--
                          <v-col cols="12" class="d-flex align-center my-4">
                            <v-divider></v-divider>
                            <span class="px-5"> or </span>
                            <v-divider></v-divider>
                          </v-col>
                          <v-btn height="45" block color="white" elevation="0" class="google text-capitalize">
                            <v-img src="@/assets/google.svg" max-width="30" class="mr-4"></v-img>
                            Sign in with Google</v-btn>-->
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-resetPassword'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium my-10">Reset</p>
                          </v-col>
                          <v-form>
                            <v-col>
                              <ValidationProvider name="password" :rules="rules.password">
                                <v-text-field
                                    slot-scope="{errors}"
                                    :error-messages="errors"
                                    v-model="resetData.password"
                                    placeholder="your password"
                                    type="password"
                                    label="Password"
                                    hint="At least 8 characters"
                                    required
                                ></v-text-field>
                              </ValidationProvider>
                              <ValidationProvider name="password" :rules="rules.password">
                                <v-text-field
                                    slot-scope="{errors}"
                                    :error-messages="errors"
                                    v-model="resetData.password2"
                                    placeholder="your confirmation password"
                                    type="password"
                                    label="Confirmation Password"
                                    hint="At least 8 characters"
                                    required
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  large
                                  :disabled="resetData.password.length < 8 && resetData.password1 != resetData.password2"
                                  color="primary"
                                  @click="resetPassword"
                              >
                                Send Link</v-btn>
                                <v-btn large text class="text-capitalize primary--text" @click="toLogin">Back to Login</v-btn>
                            
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-forgetPassword'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium my-10">Send Link</p>
                          </v-col>
                          <v-form>
                            <v-col>
                              <ValidationProvider name="email" :rules="rules.email">
                                <v-text-field
                                    slot-scope="{errors}"
                                    :error-messages="errors"
                                    v-model="forgetData.email"
                                    placeholder="test@gmail.com"
                                    label="Type your email address"
                                    required
                                ></v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  large
                                  :disabled="forgetData.email.length < 5"
                                  color="primary"
                                  @click="sendResetLink"
                              >
                                Reset Password</v-btn>
                                <v-btn large text class="text-capitalize primary--text" @click="toLogin">Back to Login</v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-footer>
                <div class="primary--text">© 2021 <a href="https://leadbook.com/" class="text-decoration-none">Leadbook</a>, LLC. All rights reserved.</div>
              </v-footer>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    </ValidationObserver>
  </v-app>
</template>

<script>
  import {
    ValidationProvider,
    ValidationObserver,
  } from "vee-validate";
  import rules from '@/rules';
  export default {
    data() {
      return {
        loginData: {email: '', password:''},
        createData: {email: '', password:'', name: '', username: '', phone: ''},
        forgetData: {email: ''},
        resetData: {password: '', password2:''},
        forgetPassword: false,
        resetCode: "",
        activeTab: "tab-login",
        rules: rules
      }
    },
    components: {
      ValidationProvider,
      ValidationObserver
    },
    async created(){
      if(localStorage.getItem("token") != null){
        if(localStorage.getItem("token").length > 70){
          this.$router.push({name: "Dashboard"});
        }
      }
      if(this.$route.query.resetcode != undefined){
        if(this.$route.query.resetcode != ''){
          let resetCode = this.$route.query.resetcode;
          await this.$store.dispatch("checkResetCode",resetCode);
          this.resetCode = resetCode;
          this.forgetPassword = true;
          this.activeTab = "tab-resetPassword";
        }
      }else if(this.$route.query.code != undefined){
        if(this.$route.query.code != ''){
          let code = this.$route.query.code;
          await this.$store.dispatch("verify",code);
          this.toLogin;
        }
      }/*else{
        let res = await this.$store.dispatch("me");
        if(res != undefined){
          this.$router.push({name:"Dashboard"});
        }
      }*/
    },
    methods: {
      async login(){
        await this.$store.dispatch('login',this.loginData);
        this.$router.push({name:"Dashboard"});
      },
      async register(){
        await this.$store.dispatch('register',this.createData);
        this.createData = {email: '', password:'', name: '', username: '', phone: ''};
        this.toLogin();
      },
      async sendResetLink(){
        await this.$store.dispatch('forgetPassword',this.forgetData);
        this.forgetData = {email: ''};
      },
      async resetPassword(){
        let payload = this.resetData;
        payload.code = this.$route.query.resetcode;
        await this.$store.dispatch('resetPassword',payload);
        this.resetData = {password: '', password2:''};
        this.toLogin();
      },
      toForgetPassword(){
        this.forgetPassword = true;
        this.activeTab = "tab-forgetPassword";
        this.$refs.obs.reset();
      },
      toResetPassword(){
        this.forgetPassword = true;
        this.activeTab = "tab-resetPassword";
        this.$refs.obs.reset();
      },
      toLogin(){
        console.log("tologin");
        this.resetCode = "";
        this.forgetPassword = false;
        this.activeTab = "tab-login";
        this.$refs.obs.reset();
      }
    },
  }

</script>

<style src="./Login.scss" lang="scss"/>
