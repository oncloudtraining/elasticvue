<template>
  <q-card>
    <q-card-section class="flex items-center">
      <h1 class="text-h5 q-my-none">
        {{ t('shards.heading') }}
      </h1>
      <reload-button :action="load" />
    </q-card-section>

    <q-separator />

    <loader-status :request-state="requestState">
      <shards-table :shards="shards" @reload="load" />
    </loader-status>
  </q-card>
</template>

<script setup lang="ts">
  import { onMounted, Ref, ref } from 'vue'
  import ReloadButton from '../shared/ReloadButton.vue'
  import LoaderStatus from '../shared/LoaderStatus.vue'
  import { useElasticsearchAdapter } from '../../composables/CallElasticsearch'
  import { convertShards, EsShardIndex, EsShard, TableShards } from '../../helpers/shards'
  import ShardsTable from './ShardsTable.vue'
  import { useTranslation } from '../../composables/i18n'

  const t = useTranslation()
  const shards: Ref<TableShards> = ref({} as TableShards)

  const { requestState, callElasticsearch } = useElasticsearchAdapter()
  const load = async () => {
    const indices: EsShardIndex[] = await callElasticsearch('catIndices', {
      h: ['index', 'health', 'pri', 'rep', 'status'],
      s: ['index']
    })
    const rawShards: EsShard[] = await callElasticsearch('catShards', CAT_METHOD_PARAMS, '*')

    shards.value = convertShards(rawShards, indices)
  }

  onMounted(load)

  const CAT_METHOD_PARAMS = {
    h: [
      'index',
      'shard',
      'prirep',
      'state',
      'node'
    ]
  }
</script>
