<template>
  <ul class="language-selector">
    <li
      v-for="locale in locales"
      :key="`locale-switcher-locale-${locale.key}`"
      >
      <span
        v-if="locale.active"
        class="language-selector__locale language-selector__locale--active"
        >{{ locale.flag }}</span>
      <button
        v-else
        class="language-selector__locale"
        @click="setLocale(locale.key)">{{ locale.flag }}</button
    ></li>
  </ul>
</template>

<script>
const flags = {
  nl: '🇳🇱',
  en: '🇬🇧'
}
export default {
  name: 'Localeswitcher',
  computed: {
    locales() {
      const { $i18n } = this.$root
      return Object.keys($i18n.messages).map(key => ({
        key,
        active: key === $i18n.locale,
        flag: flags[key]
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