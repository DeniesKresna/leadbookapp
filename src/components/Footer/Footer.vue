<template>
  <v-footer class="px-0 mt-10" color="transparent">
    <v-row no-gutters>
      <div>
        <v-btn
              v-for="link in links"
              :key="link.link"
              color="primary"
              text
              :href="link.link"
              class="text-capitalize ml-1 font-weight-regular"
          >
            {{ link.text }}
          </v-btn>
      </div>
      <div>
        <v-btn
                v-for="icon in icons"
                :key="icon.icon"
                :href="icon.link"
                class="mr-1"
                :color=config.light.textColor
                icon
        >
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
      </div>
    </v-row>
  </v-footer>
</template>

<script>
import config from '../../config';

export default {
  name: 'Footer',

  data: () => ({
    config,
    icons: [
      {icon: 'mdi-facebook', link: 'https://twitter.com/denieskresna'},
      {icon: 'mdi-twitter', link: 'https://www.facebook.com/denieskresna'},
      {icon: 'mdi-github', link: 'https://github.com/denieskresna/'},

    ],
    links: [
      {text: 'Denies', link: 'https://denies.online/'},
      {text: 'About Us', link: 'https://denies.online/about'},
      {text: 'Blog', link: 'https://denies.online/blog'},
    ]
  })
}
</script>

<style src="./Footer.scss" lang="scss"/>

