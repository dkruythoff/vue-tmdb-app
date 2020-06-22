<template>
  <ul>
    <li
      v-for="locale in locales"
      :key="`locale-switcher-locale-${locale.key}`"
      >
      <span
        v-if="locale.active"
        >{{ locale.key }}</span>
      <button
        v-else
        @click="setLocale(locale.key)">{{ locale.key }}</button
    ></li>
  </ul>
</template>

<script>
export default {
  name: 'Localeswitcher',
  computed: {
    locales() {
      const { $i18n } = this.$root
      return Object.keys($i18n.messages).map(key => ({
        key,
        active: key === $i18n.locale
      }))
    }
  },
  methods: {
    setLocale(locale) {
      this.$root.$i18n.locale = locale
    }
  }
}
</script>