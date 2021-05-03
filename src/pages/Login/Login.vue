<template>
  <v-app>
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
                              <v-text-field
                                  v-model="loginData.email"
                                  placeholder="test@gmail.com"
                                  label="Email Address"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="loginData.password"
                                  type="password"
                                  label="Password"
                                  placeholder="password"
                                  hint="At least 8 characters"
                                  required
                              ></v-text-field>

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
                              <v-text-field
                                  v-model="createData.name"
                                  placeholder="Your Name"
                                  label="Full Name"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="createData.email"
                                  placeholder="test@gmail.com"
                                  label="Email Address"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="createData.password"
                                  placeholder="your password"
                                  type="password"
                                  label="Password"
                                  hint="At least 8 characters"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  placeholder="your Phone"
                                  v-model="createData.phone"
                                  label="Phone Number"
                                  required
                              ></v-text-field>
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  large
                                  block
                                  :disabled="createData.name.length < 3 || createData.email.length < 5 || createData.password < 8"
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

                  <v-tab-item :value="'tab-forgetPassword'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium my-10">Hi, User</p>
                          </v-col>
                          <v-form>
                            <v-col>
                              <v-text-field
                                  v-model="resetData.password"
                                  placeholder="your password"
                                  type="password"
                                  label="Password"
                                  hint="At least 8 characters"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  v-model="resetData.password2"
                                  placeholder="your confirmation password"
                                  type="password"
                                  label="Confirmation Password"
                                  hint="At least 8 characters"
                                  required
                              ></v-text-field>

                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  large
                                  :disabled="resetData.password.length < 8 && resetData.password1 != resetData.password2"
                                  color="primary"
                                  @click="sendResetLink"
                              >
                                Send Link</v-btn>
                                <v-btn large text class="text-capitalize primary--text" @click="toLogin">Back to Login</v-btn>
                            
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-resetPassword'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <p class="login-slogan display-2 text-center font-weight-medium my-10">Hi, User</p>
                          </v-col>
                          <v-form>
                            <v-col>
                              <v-text-field
                                  v-model="loginData.email"
                                  placeholder="test@gmail.com"
                                  label="Type your email address"
                                  required
                              ></v-text-field>

                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                  class="text-capitalize"
                                  large
                                  :disabled="forgetData.email.length < 5"
                                  color="primary"
                                  @click="forgetPassword"
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
  </v-app>
</template>

<script>

  export default {
    data() {
      return {
        loginData: {email: '', password:''},
        createData: {email: '', password:'', name: '', phone: ''},
        forgetData: {email: ''},
        resetData: {password: '', password2:''},
        forgetPassword: false,
        resetCode: "",
        activeTab: "tab-login"
      }
    },
    async mounted(){
      if(this.$route.query.resetcode != typeof undefined){
        if(this.$route.query.resetcode != ''){
          let resetCode = this.$route.query.resetcode;
          let res = await this.$store.dispatch("checkCode",resetCode);
          //console.log(res.data);
          if(res.data != typeof undefined){
            this.resetCode = resetCode;
            this.forgetPassword = true;
            this.activeTab = "tab-resetPassword";
          }
        }
      }
    },
    methods: {
      async login(){
        let res = await this.$store.dispatch('login',this.loginData);
      },
      async register(){
        let res = await this.$store.dispatch('login',this.loginData);
      },
      async sendResetLink(){
        let res = await this.$store.dispatch('login',this.loginData);
      },
      toForgetPassword(){
        this.forgetPassword = true;
        this.activeTab = "tab-forgetPassword";
      },
      toLogin(){
        this.resetCode = "";
        this.forgetPassword = false;
        this.activeTab = "tab-login";
      }
    },
  }

</script>

<style src="./Login.scss" lang="scss"/>
