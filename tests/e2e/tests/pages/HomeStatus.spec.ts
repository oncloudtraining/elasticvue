import { test, expect } from '@playwright/test'
import { setupClusterConnection } from '../../helpers'
import { mockElastic } from '../../mocks/api'

test.describe('HomeStatus', () => {
  test('status card contains uuid and status', async ({ page }) => {
    await mockElastic(page)
    await setupClusterConnection(page)

    const uuid = 'FofbxqW5TL-NWyTYyUcUsw'
    const card = await page.getByTestId('cluster-status')
    await expect(card).toContainText(uuid)
    await expect(card).toContainText('green')
  })

  test('status card contains yellow', async ({ page }) => {
    await mockElastic(page, 'yellow')
    await setupClusterConnection(page)

    const card = await page.getByTestId('cluster-status')
    await expect(card).toContainText('yellow')

    await page.getByTestId('cluster-unhealthy-details').click()

    const list = await page.getByTestId('cluster-unhealthy-indices')
    await expect(list).toContainText('manymany')
  })

  test('node card contains node count', async ({ page }) => {
    await mockElastic(page)
    await setupClusterConnection(page)

    const card = await page.getByTestId('cluster-nodes')
    await expect(card).toContainText('2 nodes')
    await expect(card).toContainText('2 master')
    await expect(card).toContainText('2 data')
  })

  test('shards card contains shard count', async ({ page }) => {
    await mockElastic(page)
    await setupClusterConnection(page)

    const card = await page.getByTestId('cluster-shards')
    await expect(card).toContainText('16 shards')
    await expect(card).toContainText('8 primaries')
    await expect(card).toContainText('8 replicas')
  })

  test('indices card contains index information', async ({ page }) => {
    await mockElastic(page)
    await setupClusterConnection(page)

    const card = await page.getByTestId('cluster-indices')
    await expect(card).toContainText('8 indices')
    await expect(card).toContainText('174 docs')
    await expect(card).toContainText('86.1 MB on disk')
  })

  test('cluster information card', async ({ page }) => {
    await mockElastic(page)
    await setupClusterConnection(page)

    const card = await page.getByTestId('cluster-information')
    await expect(card).toContainText('es-7-node-1')
    await expect(card).toContainText('7.17.10')
  })

  test('cluster health card', async ({ page }) => {
    await mockElastic(page)
    await setupClusterConnection(page)

    const card = await page.getByTestId('cluster-health')
    await expect(card).toContainText('green')
  })
})
