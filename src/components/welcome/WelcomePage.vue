<template>
  <div class="row">
    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12 offset-sm-0">
      <q-card class="q-mt-xl">
        <q-card-section class="text-center">
          <h1 class="text-h2 q-my-md flex justify-center items-center">
            <img :src="logo" alt="logo" height="48" width="48" class="q-mr-sm">
            elasticvue
          </h1>
          <h2 class="text-h5 q-my-md text-muted text-weight-light">
            The fastest and most user-friendly gui for elasticsearch
          </h2>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <p class="q-ma-md flex items-center justify-center text-center">
            <q-icon name="info_outline" size="sm" class="q-mr-sm" />
            This seems to be your first time using elasticvue.
          </p>
          <p class="text-center q-ma-md">
            Start by adding your first cluster or importing a backup of your existing elasticvue configuration.
          </p>
        </q-card-section>

        <q-card-section horizontal>
          <q-card-section vertical style="width: 50%" class="flex justify-center items-center q-pa-lg">
            <setup-instance />
          </q-card-section>

          <q-separator vertical />

          <q-card-section vertical style="width: 50%" class="flex justify-center items-center q-pa-lg">
            <import-backup />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLogo } from '../../composables/Logo'
  import ImportBackup from './ImportBackup.vue'
  import SetupInstance from '../setup/SetupInstance.vue'

  const logo = useLogo()
</script>
