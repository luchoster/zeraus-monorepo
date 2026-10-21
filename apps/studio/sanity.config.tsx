import * as R from 'ramda'
import { defineConfig } from 'sanity'
import { assist } from '@sanity/assist'
import { dashboardTool } from '@sanity/dashboard'
import { structure } from './structure'
import { schemaTypes } from './schemas'
import { visionTool } from '@sanity/vision'
import { embeddingsIndexDashboard } from '@sanity/embeddings-index-ui'
import { structureTool } from 'sanity/structure'
import { sanityConfig } from '@zeraus/sanity-config'

import FormSubmissions from './plugins/form-submissions'
import Invoices from './plugins/invoices'
import Expenses from './plugins/expenses'

export default defineConfig([
  {
    name: 'ZERAUS',
    title: 'ZERAus',
    projectId: sanityConfig.projectId,
    basePath: '/',
    dataset: sanityConfig.dataset,
    plugins: [
      structureTool({
        structure,
      }),
      dashboardTool({
        widgets: [FormSubmissions],
      }),
      Invoices,
      Expenses,
      assist(),
      visionTool(),
      process.env.NODE_ENV === 'development'
        ? embeddingsIndexDashboard()
        : { name: 'embeddings-index-dashboard-disabled' },
    ],
    document: {
      actions: (previousActions: any, { schemaType }: any) => {
        /*
         * Please note that this will only alter the visibility of the button in the studio.
         * Users with document publish permissions will be able to create schedules directly
         * via the Scheduled Publishing API.
         */
        return previousActions
      },
    },
    schema: {
      types: schemaTypes,
    },
    // this will be useful to show custom dashboards based on user roles
    tools: (prev: any, { currentUser }) => {
      const filterObjects = R.filter(
        R.propSatisfies(R.includes(R.__, ['desk', 'dashboard']), 'name')
      )

      if (
        currentUser?.roles.find(
          (r: any) => r.name === 'administrator' || r.name === 'developer'
        )
      ) {
        return [...prev]
      }

      // else just return only desk and dashboard
      return filterObjects(prev)
    },
  },
])
