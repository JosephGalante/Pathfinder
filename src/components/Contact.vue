<template>
  <v-row>
    <v-col>
      <a
        href="https://www.github.com/josephgalante"
        target="_blank"
        ref="noreferrer noopener"
      >
        <v-icon
          class="contact-icon mr-7"
          icon="fa-brands fa-github"
          size="x-large"
        />
      </a>

      <a
        href="https://www.linkedin.com/in/jegalante"
        target="_blank"
        ref="noreferrer noopener"
      >
        <v-icon
          class="contact-icon mr-7"
          icon="fa-brands fa-linkedin"
          size="x-large"
        />
      </a>

      <a
        href="mailto:jegalante@gmail.com"
        target="_blank"
        ref="noreferrer noopener"
      >
        <v-icon
          class="contact-icon mr-7"
          icon="fa-solid fa-envelope"
          size="x-large"
        />
      </a>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Contact',
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: grey;
}

.contact-icon:hover {
  color: #ffffff;
  transform: translateY(-1px);
}
</style>
